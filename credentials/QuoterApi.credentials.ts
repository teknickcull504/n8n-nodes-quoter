import {
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class QuoterApi implements ICredentialType {
  name = 'quoterApi';

  displayName = 'Quoter API';

  documentationUrl = 'https://docs.quoter.com/api';

  properties: INodeProperties[] = [
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'string',
      default: '',
      required: true,
      description: 'OAuth Client ID from Quoter Account > API Keys',
    },
    {
      displayName: 'Client Secret',
      name: 'clientSecret',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'OAuth Client Secret from Quoter Account > API Keys',
    },
  ];

  async test(this: ICredentialTestRequest): Promise<{ statusCode: number; statusMessage: string }> {
    const credentials = this.credentials;
    if (!credentials?.clientId || !credentials?.clientSecret) {
      return {
        statusCode: 401,
        statusMessage: 'Missing credentials',
      };
    }

    try {
      const response = await this.helpers.request({
        url: 'https://api.quoter.com/v1/auth/oauth/authorize',
        method: 'POST',
        body: {
          client_id: credentials.clientId,
          client_secret: credentials.clientSecret,
          grant_type: 'client_credentials',
        },
        resolveWithFullResponse: false,
      });

      if (response && (response as any).access_token) {
        return {
          statusCode: 200,
          statusMessage: 'Connection successful',
        };
      }

      return {
        statusCode: 401,
        statusMessage: 'Failed to obtain access token',
      };
    } catch (error) {
      return {
        statusCode: 401,
        statusMessage: `Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }
}
