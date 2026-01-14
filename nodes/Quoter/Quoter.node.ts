import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeApiError,
} from 'n8n-workflow';

import { buildQueryParams, quoterApiRequest, quoterApiRequestAllItems } from './GenericFunctions';

import { categoryDescription } from './descriptions/CategoryDescription';
import { contactDescription } from './descriptions/ContactDescription';
import { dataFeedSupplierDescription } from './descriptions/DataFeedSupplierDescription';
import { dataFeedSupplierItemDescription } from './descriptions/DataFeedSupplierItemDescription';
import { itemDescription } from './descriptions/ItemDescription';
import { itemGroupDescription } from './descriptions/ItemGroupDescription';
import { itemGroupItemAssignmentDescription } from './descriptions/ItemGroupItemAssignmentDescription';
import { itemOptionDescription } from './descriptions/ItemOptionDescription';
import { itemOptionValueDescription } from './descriptions/ItemOptionValueDescription';
import { itemTierDescription } from './descriptions/ItemTierDescription';
import { lineItemDescription } from './descriptions/LineItemDescription';
import { manufacturerDescription } from './descriptions/ManufacturerDescription';
import { quoteDescription } from './descriptions/QuoteDescription';
import { quoteTemplateDescription } from './descriptions/QuoteTemplateDescription';
import { supplierDescription } from './descriptions/SupplierDescription';

export class Quoter implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Quoter',
    name: 'quoter',
    icon: 'file:quoter.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Quoter API',
    defaults: {
      name: 'Quoter',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'quoterApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Category', value: 'category' },
          { name: 'Contact', value: 'contact' },
          { name: 'Data Feed Supplier', value: 'dataFeedSupplier' },
          { name: 'Data Feed Supplier Item', value: 'dataFeedSupplierItem' },
          { name: 'Item', value: 'item' },
          { name: 'Item Group', value: 'itemGroup' },
          { name: 'Item Group Item Assignment', value: 'itemGroupItemAssignment' },
          { name: 'Item Option', value: 'itemOption' },
          { name: 'Item Option Value', value: 'itemOptionValue' },
          { name: 'Item Tier', value: 'itemTier' },
          { name: 'Line Item', value: 'lineItem' },
          { name: 'Manufacturer', value: 'manufacturer' },
          { name: 'Quote', value: 'quote' },
          { name: 'Quote Template', value: 'quoteTemplate' },
          { name: 'Supplier', value: 'supplier' },
        ],
        default: 'quote',
      },
      ...categoryDescription,
      ...contactDescription,
      ...dataFeedSupplierDescription,
      ...dataFeedSupplierItemDescription,
      ...itemDescription,
      ...itemGroupDescription,
      ...itemGroupItemAssignmentDescription,
      ...itemOptionDescription,
      ...itemOptionValueDescription,
      ...itemTierDescription,
      ...lineItemDescription,
      ...manufacturerDescription,
      ...quoteDescription,
      ...quoteTemplateDescription,
      ...supplierDescription,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData: any;

        switch (resource) {
          case 'category':
            responseData = await executeCategoryOperation.call(this, operation, i);
            break;
          case 'contact':
            responseData = await executeContactOperation.call(this, operation, i);
            break;
          case 'dataFeedSupplier':
            responseData = await executeDataFeedSupplierOperation.call(this, operation, i);
            break;
          case 'dataFeedSupplierItem':
            responseData = await executeDataFeedSupplierItemOperation.call(this, operation, i);
            break;
          case 'item':
            responseData = await executeItemOperation.call(this, operation, i);
            break;
          case 'itemGroup':
            responseData = await executeItemGroupOperation.call(this, operation, i);
            break;
          case 'itemGroupItemAssignment':
            responseData = await executeItemGroupItemAssignmentOperation.call(this, operation, i);
            break;
          case 'itemOption':
            responseData = await executeItemOptionOperation.call(this, operation, i);
            break;
          case 'itemOptionValue':
            responseData = await executeItemOptionValueOperation.call(this, operation, i);
            break;
          case 'itemTier':
            responseData = await executeItemTierOperation.call(this, operation, i);
            break;
          case 'lineItem':
            responseData = await executeLineItemOperation.call(this, operation, i);
            break;
          case 'manufacturer':
            responseData = await executeManufacturerOperation.call(this, operation, i);
            break;
          case 'quote':
            responseData = await executeQuoteOperation.call(this, operation, i);
            break;
          case 'quoteTemplate':
            responseData = await executeQuoteTemplateOperation.call(this, operation, i);
            break;
          case 'supplier':
            responseData = await executeSupplierOperation.call(this, operation, i);
            break;
          default:
            throw new NodeApiError(this.getNode(), {
              message: `Unknown resource: ${resource}`,
            });
        }

        if (Array.isArray(responseData)) {
          returnData.push(...responseData.map((item) => ({ json: item })));
        } else {
          returnData.push({ json: responseData });
        }
      } catch (error: unknown) {
        if (this.continueOnFail()) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          returnData.push({ json: { error: errorMessage }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

// Standalone functions for executing operations
async function executeCategoryOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createCategory.call(this, itemIndex);
    case 'get':
      return getCategory.call(this, itemIndex);
    case 'getAll':
      return getAllCategories.call(this, itemIndex);
    case 'update':
      return updateCategory.call(this, itemIndex);
    case 'delete':
      return deleteCategory.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeContactOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createContact.call(this, itemIndex);
    case 'get':
      return getContact.call(this, itemIndex);
    case 'getAll':
      return getAllContacts.call(this, itemIndex);
    case 'update':
      return updateContact.call(this, itemIndex);
    case 'delete':
      return deleteContact.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeDataFeedSupplierOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'get':
      return getDataFeedSupplier.call(this, itemIndex);
    case 'getAll':
      return getAllDataFeedSuppliers.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeDataFeedSupplierItemOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'getAll':
      return getAllDataFeedSupplierItems.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeItemOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createItem.call(this, itemIndex);
    case 'get':
      return getItem.call(this, itemIndex);
    case 'getAll':
      return getAllItems.call(this, itemIndex);
    case 'update':
      return updateItem.call(this, itemIndex);
    case 'delete':
      return deleteItem.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeItemGroupOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createItemGroup.call(this, itemIndex);
    case 'get':
      return getItemGroup.call(this, itemIndex);
    case 'getAll':
      return getAllItemGroups.call(this, itemIndex);
    case 'update':
      return updateItemGroup.call(this, itemIndex);
    case 'delete':
      return deleteItemGroup.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeItemGroupItemAssignmentOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createItemGroupItemAssignment.call(this, itemIndex);
    case 'get':
      return getItemGroupItemAssignment.call(this, itemIndex);
    case 'getAll':
      return getAllItemGroupItemAssignments.call(this, itemIndex);
    case 'delete':
      return deleteItemGroupItemAssignment.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeItemOptionOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createItemOption.call(this, itemIndex);
    case 'get':
      return getItemOption.call(this, itemIndex);
    case 'getAll':
      return getAllItemOptions.call(this, itemIndex);
    case 'update':
      return updateItemOption.call(this, itemIndex);
    case 'delete':
      return deleteItemOption.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeItemOptionValueOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createItemOptionValue.call(this, itemIndex);
    case 'get':
      return getItemOptionValue.call(this, itemIndex);
    case 'getAll':
      return getAllItemOptionValues.call(this, itemIndex);
    case 'update':
      return updateItemOptionValue.call(this, itemIndex);
    case 'delete':
      return deleteItemOptionValue.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeItemTierOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createItemTier.call(this, itemIndex);
    case 'get':
      return getItemTier.call(this, itemIndex);
    case 'getAll':
      return getAllItemTiers.call(this, itemIndex);
    case 'update':
      return updateItemTier.call(this, itemIndex);
    case 'delete':
      return deleteItemTier.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeLineItemOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createLineItem.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeManufacturerOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createManufacturer.call(this, itemIndex);
    case 'get':
      return getManufacturer.call(this, itemIndex);
    case 'getAll':
      return getAllManufacturers.call(this, itemIndex);
    case 'update':
      return updateManufacturer.call(this, itemIndex);
    case 'delete':
      return deleteManufacturer.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeQuoteOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createQuote.call(this, itemIndex);
    case 'get':
      return getQuote.call(this, itemIndex);
    case 'getAll':
      return getAllQuotes.call(this, itemIndex);
    case 'update':
      return updateQuote.call(this, itemIndex);
    case 'delete':
      return deleteQuote.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeQuoteTemplateOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'get':
      return getQuoteTemplate.call(this, itemIndex);
    case 'getAll':
      return getAllQuoteTemplates.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

async function executeSupplierOperation(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<any> {
  switch (operation) {
    case 'create':
      return createSupplier.call(this, itemIndex);
    case 'get':
      return getSupplier.call(this, itemIndex);
    case 'getAll':
      return getAllSuppliers.call(this, itemIndex);
    case 'update':
      return updateSupplier.call(this, itemIndex);
    case 'delete':
      return deleteSupplier.call(this, itemIndex);
    default:
      throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
  }
}

// Category operations
async function createCategory(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/categories', body, query);
  }

async function getCategory(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const categoryId = this.getNodeParameter('categoryId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/categories/${categoryId}`, undefined, query);
  }

async function getAllCategories(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/categories', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/categories', undefined, query);
    return response.data || [];
  }

async function updateCategory(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const categoryId = this.getNodeParameter('categoryId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/categories/${categoryId}`, body, query);
  }

async function deleteCategory(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const categoryId = this.getNodeParameter('categoryId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/categories/${categoryId}`);
  }

  // Contact operations
async function createContact(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const firstName = this.getNodeParameter('first_name', itemIndex) as string;
    const lastName = this.getNodeParameter('last_name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { first_name: firstName, last_name: lastName, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/contacts', body, query);
  }

async function getContact(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const contactId = this.getNodeParameter('contactId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/contacts/${contactId}`, undefined, query);
  }

async function getAllContacts(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/contacts', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/contacts', undefined, query);
    return response.data || [];
  }

async function updateContact(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const contactId = this.getNodeParameter('contactId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/contacts/${contactId}`, body, query);
  }

async function deleteContact(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const contactId = this.getNodeParameter('contactId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/contacts/${contactId}`);
  }

  // Data Feed Supplier operations
async function getDataFeedSupplier(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const dataFeedSupplierId = this.getNodeParameter('dataFeedSupplierId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/data_feed_suppliers/${dataFeedSupplierId}`, undefined, query);
  }

async function getAllDataFeedSuppliers(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams({}, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/data_feed_suppliers', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/data_feed_suppliers', undefined, query);
    return response.data || [];
  }

  // Data Feed Supplier Item operations
async function getAllDataFeedSupplierItems(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const mpns = this.getNodeParameter('mpns', itemIndex) as string;
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const mpnArray = mpns.split(',').map((m: string) => m.trim()).filter((m: string) => m);
    const query: any = {
      mpns: mpnArray,
    };

    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    if (!returnAll) {
      query.page = 1;
      query.limit = Math.min(Math.max(limit, 1), 100);
    }

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/data_feed_supplier_items', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/data_feed_supplier_items', undefined, query);
    return response.data || [];
  }

  // Item operations
async function createItem(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/items', body, query);
  }

async function getItem(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('itemId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/items/${itemId}`, undefined, query);
  }

async function getAllItems(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/items', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/items', undefined, query);
    return response.data || [];
  }

async function updateItem(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('itemId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/items/${itemId}`, body, query);
  }

async function deleteItem(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('itemId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/items/${itemId}`);
  }

  // Item Group operations
async function createItemGroup(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/item_groups', body, query);
  }

async function getItemGroup(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemGroupId = this.getNodeParameter('itemGroupId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/item_groups/${itemGroupId}`, undefined, query);
  }

async function getAllItemGroups(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/item_groups', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/item_groups', undefined, query);
    return response.data || [];
  }

async function updateItemGroup(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemGroupId = this.getNodeParameter('itemGroupId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/item_groups/${itemGroupId}`, body, query);
  }

async function deleteItemGroup(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemGroupId = this.getNodeParameter('itemGroupId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_groups/${itemGroupId}`);
  }

  // Item Group Item Assignment operations
async function createItemGroupItemAssignment(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('item_id', itemIndex) as string;
    const itemGroupId = this.getNodeParameter('item_group_id', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { item_id: itemId, item_group_id: itemGroupId };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/item_group_item_assignments', body, query);
  }

async function getItemGroupItemAssignment(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemGroupItemAssignmentId = this.getNodeParameter('itemGroupItemAssignmentId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(
      this,
      'GET',
      `/item_group_item_assignments/${itemGroupItemAssignmentId}`,
      undefined,
      query
    );
  }

async function getAllItemGroupItemAssignments(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/item_group_item_assignments', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/item_group_item_assignments', undefined, query);
    return response.data || [];
  }

async function deleteItemGroupItemAssignment(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemGroupItemAssignmentId = this.getNodeParameter('itemGroupItemAssignmentId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_group_item_assignments/${itemGroupItemAssignmentId}`);
  }

  // Item Option operations
async function createItemOption(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('itemId', itemIndex) as string;
    const name = this.getNodeParameter('name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { item_id: itemId, name, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/item_options', body, query);
  }

async function getItemOption(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemOptionId = this.getNodeParameter('itemOptionId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/item_options/${itemOptionId}`, undefined, query);
  }

async function getAllItemOptions(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('itemId', itemIndex) as string;
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams({ ...filters, itemId }, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/item_options', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/item_options', undefined, query);
    return response.data || [];
  }

async function updateItemOption(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemOptionId = this.getNodeParameter('itemOptionId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/item_options/${itemOptionId}`, body, query);
  }

async function deleteItemOption(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemOptionId = this.getNodeParameter('itemOptionId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_options/${itemOptionId}`);
  }

  // Item Option Value operations
async function createItemOptionValue(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('item_id', itemIndex) as string;
    const itemOptionId = this.getNodeParameter('item_option_id', itemIndex) as string;
    const name = this.getNodeParameter('name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { item_id: itemId, item_option_id: itemOptionId, name, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/item_option_values', body, query);
  }

async function getItemOptionValue(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemOptionValueId = this.getNodeParameter('itemOptionValueId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/item_option_values/${itemOptionValueId}`, undefined, query);
  }

async function getAllItemOptionValues(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/item_option_values', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/item_option_values', undefined, query);
    return response.data || [];
  }

async function updateItemOptionValue(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemOptionValueId = this.getNodeParameter('itemOptionValueId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/item_option_values/${itemOptionValueId}`, body, query);
  }

async function deleteItemOptionValue(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemOptionValueId = this.getNodeParameter('itemOptionValueId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_option_values/${itemOptionValueId}`);
  }

  // Item Tier operations
async function createItemTier(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('item_id', itemIndex) as string;
    const lowerBoundary = this.getNodeParameter('lower_boundary', itemIndex) as number;
    const priceDecimal = this.getNodeParameter('price_decimal', itemIndex) as number;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = {
      item_id: itemId,
      lower_boundary: lowerBoundary,
      price_decimal: priceDecimal,
      ...additionalFields,
    };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/item_tiers', body, query);
  }

async function getItemTier(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemTierId = this.getNodeParameter('itemTierId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/item_tiers/${itemTierId}`, undefined, query);
  }

async function getAllItemTiers(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('item_id', itemIndex) as string;
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams({ ...filters, itemId }, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/item_tiers', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/item_tiers', undefined, query);
    return response.data || [];
  }

async function updateItemTier(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemTierId = this.getNodeParameter('itemTierId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/item_tiers/${itemTierId}`, body, query);
  }

async function deleteItemTier(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const itemTierId = this.getNodeParameter('itemTierId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_tiers/${itemTierId}`);
  }

  // Line Item operations
async function createLineItem(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const quoteId = this.getNodeParameter('quote_id', itemIndex) as string;
    const name = this.getNodeParameter('name', itemIndex) as string;
    const category = this.getNodeParameter('category', itemIndex) as string;
    const quantity = this.getNodeParameter('quantity', itemIndex) as number;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { quote_id: quoteId, name, category, quantity, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/line_items', body, query);
  }

  // Manufacturer operations
async function createManufacturer(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/manufacturers', body, query);
  }

async function getManufacturer(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const manufacturerId = this.getNodeParameter('manufacturerId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/manufacturers/${manufacturerId}`, undefined, query);
  }

async function getAllManufacturers(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/manufacturers', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/manufacturers', undefined, query);
    return response.data || [];
  }

async function updateManufacturer(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const manufacturerId = this.getNodeParameter('manufacturerId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/manufacturers/${manufacturerId}`, body, query);
  }

async function deleteManufacturer(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const manufacturerId = this.getNodeParameter('manufacturerId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/manufacturers/${manufacturerId}`);
  }

  // Quote operations
async function createQuote(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const templateId = this.getNodeParameter('template_id', itemIndex) as string;
    const contactId = this.getNodeParameter('contact_id', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { template_id: templateId, contact_id: contactId, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/quotes', body, query);
  }

async function getQuote(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const quoteId = this.getNodeParameter('quoteId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/quotes/${quoteId}`, undefined, query);
  }

async function getAllQuotes(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/quotes', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/quotes', undefined, query);
    return response.data || [];
  }

async function updateQuote(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const quoteId = this.getNodeParameter('quoteId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/quotes/${quoteId}`, body, query);
  }

async function deleteQuote(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const quoteId = this.getNodeParameter('quoteId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/quotes/${quoteId}`);
  }

  // Quote Template operations
async function getQuoteTemplate(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const quoteTemplateId = this.getNodeParameter('quoteTemplateId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/quote_templates/${quoteTemplateId}`, undefined, query);
  }

async function getAllQuoteTemplates(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/quote_templates', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/quote_templates', undefined, query);
    return response.data || [];
  }

  // Supplier operations
async function createSupplier(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/suppliers', body, query);
  }

async function getSupplier(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const supplierId = this.getNodeParameter('supplierId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/suppliers/${supplierId}`, undefined, query);
  }

async function getAllSuppliers(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
    const limit = this.getNodeParameter('limit', itemIndex, 50) as number;
    const filters = this.getNodeParameter('filters', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query = buildQueryParams(filters, options, returnAll, limit);

    if (returnAll) {
      return quoterApiRequestAllItems.call(this, 'GET', '/suppliers', query);
    }

    const response = await quoterApiRequest.call(this, 'GET', '/suppliers', undefined, query);
    return response.data || [];
  }

async function updateSupplier(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const supplierId = this.getNodeParameter('supplierId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/suppliers/${supplierId}`, body, query);
  }

async function deleteSupplier(this: IExecuteFunctions, itemIndex: number): Promise<any> {
    const supplierId = this.getNodeParameter('supplierId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/suppliers/${supplierId}`);
  }
