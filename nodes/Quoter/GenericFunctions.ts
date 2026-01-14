import {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  ILoadOptionsFunctions,
  NodeApiError,
} from 'n8n-workflow';

interface QuoterApiError {
  errors?: Array<{
    key?: string;
    title?: string;
    detail?: string;
  }>;
}

interface PaginatedResponse {
  data: IDataObject[];
  has_more: boolean;
  total_count?: number;
}

/**
 * Get access token from credentials, with caching and refresh support
 */
async function getAccessToken(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions
): Promise<string> {
  const credentials = (await this.getCredentials('quoterApi')) as IDataObject;
  const baseUrl = 'https://api.quoter.com/v1';

  // Check if we have a valid stored token in credentials
  const storedToken = credentials.access_token as string | undefined;
  const expiresAt = credentials.expires_at as number | undefined;

  if (storedToken && expiresAt && expiresAt > Date.now()) {
    return storedToken;
  }

  // Try to refresh if we have a refresh token
  const refreshToken = credentials.refresh_token as string | undefined;
  if (refreshToken) {
    try {
      const refreshResponse = await this.helpers.request.call(this, {
        url: `${baseUrl}/auth/refresh`,
        method: 'POST',
        body: {
          client_id: credentials.clientId,
          client_secret: credentials.clientSecret,
          refresh_token: refreshToken,
        },
        resolveWithFullResponse: false,
      });

      const newTokens = refreshResponse as { access_token: string; refresh_token: string };
      if (newTokens.access_token) {
        // Store tokens in credentials (n8n will persist these)
        credentials.access_token = newTokens.access_token;
        credentials.refresh_token = newTokens.refresh_token || refreshToken;
        credentials.expires_at = Date.now() + 60 * 60 * 1000; // 1 hour
        return newTokens.access_token;
      }
    } catch (error) {
      // Refresh failed, continue to get new token
    }
  }

  // Get new access token
  const tokenResponse = await this.helpers.request.call(this, {
    url: `${baseUrl}/auth/oauth/authorize`,
    method: 'POST' as any,
    body: {
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      grant_type: 'client_credentials',
    },
    resolveWithFullResponse: false,
  });

  const tokens = tokenResponse as { access_token: string; refresh_token: string };
  if (!tokens.access_token) {
    throw new NodeApiError(this.getNode(), {
      message: 'Failed to obtain access token',
    });
  }

  // Store tokens in credentials
  credentials.access_token = tokens.access_token;
  credentials.refresh_token = tokens.refresh_token;
  credentials.expires_at = Date.now() + 60 * 60 * 1000; // 1 hour

  return tokens.access_token;
}

/**
 * Make an authenticated request to the Quoter API
 * Handles token refresh, rate limiting, and error parsing
 */
export async function quoterApiRequest(
  this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
  method: string,
  endpoint: string,
  body?: IDataObject,
  query?: IDataObject,
  retryCount = 0
): Promise<any> {
  const baseUrl = 'https://api.quoter.com/v1';

  const accessToken = await getAccessToken.call(this);

  const headers: IDataObject = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const url = new URL(`${baseUrl}${endpoint}`);
  if (query) {
    Object.keys(query).forEach((key) => {
      const value = query[key];
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            url.searchParams.append(key, String(item));
          });
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    });
  }

  try {
    const response = await this.helpers.request.call(this, {
      url: url.toString(),
      method: method as any,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      resolveWithFullResponse: false,
    });

    return response;
  } catch (error: any) {
    // Handle rate limiting (429) with exponential backoff
    if (error.statusCode === 429 && retryCount < 3) {
      const retryAfter = error.response?.headers?.['retry-after'] || Math.pow(2, retryCount);
      const waitTime = parseInt(String(retryAfter), 10) * 1000;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return quoterApiRequest.call(this, method, endpoint, body, query, retryCount + 1);
    }

    // Handle 401 - token might be expired, try refreshing
    if (error.statusCode === 401 && retryCount === 0) {
      // Force token refresh by clearing stored token
      const creds = (await this.getCredentials('quoterApi')) as IDataObject;
      delete creds.access_token;
      return quoterApiRequest.call(this, method, endpoint, body, query, retryCount + 1);
    }

    // Parse Quoter API error format
    if (error.response?.body) {
      const errorBody = error.response.body as QuoterApiError;
      if (errorBody.errors && Array.isArray(errorBody.errors)) {
        const errorMessages = errorBody.errors.map((err) => {
          if (err.detail) return err.detail;
          if (err.title) return err.title;
          if (err.key) return err.key;
          return 'Unknown error';
        });
        throw new NodeApiError(this.getNode(), {
          message: errorMessages.join('; '),
          httpCode: error.statusCode,
        });
      }
    }

    throw new NodeApiError(this.getNode(), error);
  }
}

/**
 * Get all items from a paginated endpoint
 */
export async function quoterApiRequestAllItems(
  this: IHookFunctions | IExecuteFunctions,
  method: string,
  endpoint: string,
  query?: IDataObject
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = (await quoterApiRequest.call(this, method, endpoint, undefined, {
      ...query,
      page,
      limit: 100,
    })) as PaginatedResponse;

    if (response.data && Array.isArray(response.data)) {
      returnData.push(...response.data);
    }

    hasMore = response.has_more === true;
    page++;
  }

  return returnData;
}

/**
 * Build filter query parameters from filter collection
 */
export function buildFilterParams(filters: IDataObject): IDataObject {
  const filterParams: IDataObject = {};

  // Map common filter patterns to Quoter API format
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (value === undefined || value === null || value === '') {
      return;
    }

    // Handle date filters
    if (key.endsWith('After') || key.endsWith('Before')) {
      const fieldName = key.replace(/(After|Before)$/, '').replace(/([A-Z])/g, '_$1').toLowerCase().substring(1);
      const operator = key.endsWith('After') ? 'gt' : 'lt';
      filterParams[`filter[${fieldName}]`] = `${operator}:${value}`;
      return;
    }

    // Handle contains filters
    if (key.endsWith('Contains')) {
      const fieldName = key.replace('Contains', '').replace(/([A-Z])/g, '_$1').toLowerCase().substring(1);
      filterParams[`filter[${fieldName}]`] = `cont:${value}`;
      return;
    }

    // Handle ID filters (exact match)
    if (key.endsWith('Id') || key.endsWith('ID')) {
      const fieldName = key.replace(/([A-Z])/g, '_$1').toLowerCase().substring(1);
      filterParams[`filter[${fieldName}]`] = `eq:${value}`;
      return;
    }

    // Default to contains for string fields
    if (typeof value === 'string') {
      const fieldName = key.replace(/([A-Z])/g, '_$1').toLowerCase().substring(1);
      filterParams[`filter[${fieldName}]`] = `cont:${value}`;
    } else {
      // For other types, use exact match
      const fieldName = key.replace(/([A-Z])/g, '_$1').toLowerCase().substring(1);
      filterParams[`filter[${fieldName}]`] = `eq:${value}`;
    }
  });

  return filterParams;
}

/**
 * Build query parameters including filters, fields, sort, and pagination
 */
export function buildQueryParams(
  filters: IDataObject,
  options: IDataObject,
  returnAll: boolean,
  limit?: number
): IDataObject {
  const query: IDataObject = {};

  // Add filters
  const filterParams = buildFilterParams(filters);
  Object.assign(query, filterParams);

  // Add fields
  if (options.fields && Array.isArray(options.fields) && options.fields.length > 0) {
    query.fields = options.fields.join(',');
  }

  // Add sort
  if (options.sortBy) {
    query.sort_by = options.sortBy;
  }

  // Add pagination
  if (!returnAll) {
    query.page = 1;
    query.limit = Math.min(Math.max(limit || 50, 1), 100);
  }

  return query;
}
