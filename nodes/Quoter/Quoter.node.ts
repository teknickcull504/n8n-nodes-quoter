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
            responseData = await this.executeCategoryOperation.call(this, operation, i);
            break;
          case 'contact':
            responseData = await this.executeContactOperation.call(this, operation, i);
            break;
          case 'dataFeedSupplier':
            responseData = await this.executeDataFeedSupplierOperation.call(this, operation, i);
            break;
          case 'dataFeedSupplierItem':
            responseData = await this.executeDataFeedSupplierItemOperation.call(this, operation, i);
            break;
          case 'item':
            responseData = await this.executeItemOperation.call(this, operation, i);
            break;
          case 'itemGroup':
            responseData = await this.executeItemGroupOperation.call(this, operation, i);
            break;
          case 'itemGroupItemAssignment':
            responseData = await this.executeItemGroupItemAssignmentOperation.call(this, operation, i);
            break;
          case 'itemOption':
            responseData = await this.executeItemOptionOperation.call(this, operation, i);
            break;
          case 'itemOptionValue':
            responseData = await this.executeItemOptionValueOperation.call(this, operation, i);
            break;
          case 'itemTier':
            responseData = await this.executeItemTierOperation.call(this, operation, i);
            break;
          case 'lineItem':
            responseData = await this.executeLineItemOperation.call(this, operation, i);
            break;
          case 'manufacturer':
            responseData = await this.executeManufacturerOperation.call(this, operation, i);
            break;
          case 'quote':
            responseData = await this.executeQuoteOperation.call(this, operation, i);
            break;
          case 'quoteTemplate':
            responseData = await this.executeQuoteTemplateOperation.call(this, operation, i);
            break;
          case 'supplier':
            responseData = await this.executeSupplierOperation.call(this, operation, i);
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
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }

  private async executeCategoryOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createCategory(itemIndex);
      case 'get':
        return this.getCategory(itemIndex);
      case 'getAll':
        return this.getAllCategories(itemIndex);
      case 'update':
        return this.updateCategory(itemIndex);
      case 'delete':
        return this.deleteCategory(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeContactOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createContact(itemIndex);
      case 'get':
        return this.getContact(itemIndex);
      case 'getAll':
        return this.getAllContacts(itemIndex);
      case 'update':
        return this.updateContact(itemIndex);
      case 'delete':
        return this.deleteContact(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeDataFeedSupplierOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'get':
        return this.getDataFeedSupplier(itemIndex);
      case 'getAll':
        return this.getAllDataFeedSuppliers(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeDataFeedSupplierItemOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'getAll':
        return this.getAllDataFeedSupplierItems(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeItemOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createItem(itemIndex);
      case 'get':
        return this.getItem(itemIndex);
      case 'getAll':
        return this.getAllItems(itemIndex);
      case 'update':
        return this.updateItem(itemIndex);
      case 'delete':
        return this.deleteItem(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeItemGroupOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createItemGroup(itemIndex);
      case 'get':
        return this.getItemGroup(itemIndex);
      case 'getAll':
        return this.getAllItemGroups(itemIndex);
      case 'update':
        return this.updateItemGroup(itemIndex);
      case 'delete':
        return this.deleteItemGroup(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeItemGroupItemAssignmentOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createItemGroupItemAssignment(itemIndex);
      case 'get':
        return this.getItemGroupItemAssignment(itemIndex);
      case 'getAll':
        return this.getAllItemGroupItemAssignments(itemIndex);
      case 'delete':
        return this.deleteItemGroupItemAssignment(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeItemOptionOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createItemOption(itemIndex);
      case 'get':
        return this.getItemOption(itemIndex);
      case 'getAll':
        return this.getAllItemOptions(itemIndex);
      case 'update':
        return this.updateItemOption(itemIndex);
      case 'delete':
        return this.deleteItemOption(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeItemOptionValueOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createItemOptionValue(itemIndex);
      case 'get':
        return this.getItemOptionValue(itemIndex);
      case 'getAll':
        return this.getAllItemOptionValues(itemIndex);
      case 'update':
        return this.updateItemOptionValue(itemIndex);
      case 'delete':
        return this.deleteItemOptionValue(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeItemTierOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createItemTier(itemIndex);
      case 'get':
        return this.getItemTier(itemIndex);
      case 'getAll':
        return this.getAllItemTiers(itemIndex);
      case 'update':
        return this.updateItemTier(itemIndex);
      case 'delete':
        return this.deleteItemTier(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeLineItemOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createLineItem(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeManufacturerOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createManufacturer(itemIndex);
      case 'get':
        return this.getManufacturer(itemIndex);
      case 'getAll':
        return this.getAllManufacturers(itemIndex);
      case 'update':
        return this.updateManufacturer(itemIndex);
      case 'delete':
        return this.deleteManufacturer(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeQuoteOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createQuote(itemIndex);
      case 'get':
        return this.getQuote(itemIndex);
      case 'getAll':
        return this.getAllQuotes(itemIndex);
      case 'update':
        return this.updateQuote(itemIndex);
      case 'delete':
        return this.deleteQuote(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeQuoteTemplateOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'get':
        return this.getQuoteTemplate(itemIndex);
      case 'getAll':
        return this.getAllQuoteTemplates(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  private async executeSupplierOperation(operation: string, itemIndex: number): Promise<any> {
    switch (operation) {
      case 'create':
        return this.createSupplier(itemIndex);
      case 'get':
        return this.getSupplier(itemIndex);
      case 'getAll':
        return this.getAllSuppliers(itemIndex);
      case 'update':
        return this.updateSupplier(itemIndex);
      case 'delete':
        return this.deleteSupplier(itemIndex);
      default:
        throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
    }
  }

  // Category operations
  private async createCategory(itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/categories', body, query);
  }

  private async getCategory(itemIndex: number): Promise<any> {
    const categoryId = this.getNodeParameter('categoryId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/categories/${categoryId}`, undefined, query);
  }

  private async getAllCategories(itemIndex: number): Promise<any> {
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

  private async updateCategory(itemIndex: number): Promise<any> {
    const categoryId = this.getNodeParameter('categoryId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/categories/${categoryId}`, body, query);
  }

  private async deleteCategory(itemIndex: number): Promise<any> {
    const categoryId = this.getNodeParameter('categoryId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/categories/${categoryId}`);
  }

  // Contact operations
  private async createContact(itemIndex: number): Promise<any> {
    const firstName = this.getNodeParameter('first_name', itemIndex) as string;
    const lastName = this.getNodeParameter('last_name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { first_name: firstName, last_name: lastName, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/contacts', body, query);
  }

  private async getContact(itemIndex: number): Promise<any> {
    const contactId = this.getNodeParameter('contactId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/contacts/${contactId}`, undefined, query);
  }

  private async getAllContacts(itemIndex: number): Promise<any> {
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

  private async updateContact(itemIndex: number): Promise<any> {
    const contactId = this.getNodeParameter('contactId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/contacts/${contactId}`, body, query);
  }

  private async deleteContact(itemIndex: number): Promise<any> {
    const contactId = this.getNodeParameter('contactId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/contacts/${contactId}`);
  }

  // Data Feed Supplier operations
  private async getDataFeedSupplier(itemIndex: number): Promise<any> {
    const dataFeedSupplierId = this.getNodeParameter('dataFeedSupplierId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/data_feed_suppliers/${dataFeedSupplierId}`, undefined, query);
  }

  private async getAllDataFeedSuppliers(itemIndex: number): Promise<any> {
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
  private async getAllDataFeedSupplierItems(itemIndex: number): Promise<any> {
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
  private async createItem(itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/items', body, query);
  }

  private async getItem(itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('itemId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/items/${itemId}`, undefined, query);
  }

  private async getAllItems(itemIndex: number): Promise<any> {
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

  private async updateItem(itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('itemId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/items/${itemId}`, body, query);
  }

  private async deleteItem(itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('itemId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/items/${itemId}`);
  }

  // Item Group operations
  private async createItemGroup(itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/item_groups', body, query);
  }

  private async getItemGroup(itemIndex: number): Promise<any> {
    const itemGroupId = this.getNodeParameter('itemGroupId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/item_groups/${itemGroupId}`, undefined, query);
  }

  private async getAllItemGroups(itemIndex: number): Promise<any> {
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

  private async updateItemGroup(itemIndex: number): Promise<any> {
    const itemGroupId = this.getNodeParameter('itemGroupId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/item_groups/${itemGroupId}`, body, query);
  }

  private async deleteItemGroup(itemIndex: number): Promise<any> {
    const itemGroupId = this.getNodeParameter('itemGroupId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_groups/${itemGroupId}`);
  }

  // Item Group Item Assignment operations
  private async createItemGroupItemAssignment(itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('item_id', itemIndex) as string;
    const itemGroupId = this.getNodeParameter('item_group_id', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { item_id: itemId, item_group_id: itemGroupId };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/item_group_item_assignments', body, query);
  }

  private async getItemGroupItemAssignment(itemIndex: number): Promise<any> {
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

  private async getAllItemGroupItemAssignments(itemIndex: number): Promise<any> {
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

  private async deleteItemGroupItemAssignment(itemIndex: number): Promise<any> {
    const itemGroupItemAssignmentId = this.getNodeParameter('itemGroupItemAssignmentId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_group_item_assignments/${itemGroupItemAssignmentId}`);
  }

  // Item Option operations
  private async createItemOption(itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('itemId', itemIndex) as string;
    const name = this.getNodeParameter('name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { item_id: itemId, name, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/item_options', body, query);
  }

  private async getItemOption(itemIndex: number): Promise<any> {
    const itemOptionId = this.getNodeParameter('itemOptionId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/item_options/${itemOptionId}`, undefined, query);
  }

  private async getAllItemOptions(itemIndex: number): Promise<any> {
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

  private async updateItemOption(itemIndex: number): Promise<any> {
    const itemOptionId = this.getNodeParameter('itemOptionId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/item_options/${itemOptionId}`, body, query);
  }

  private async deleteItemOption(itemIndex: number): Promise<any> {
    const itemOptionId = this.getNodeParameter('itemOptionId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_options/${itemOptionId}`);
  }

  // Item Option Value operations
  private async createItemOptionValue(itemIndex: number): Promise<any> {
    const itemId = this.getNodeParameter('item_id', itemIndex) as string;
    const itemOptionId = this.getNodeParameter('item_option_id', itemIndex) as string;
    const name = this.getNodeParameter('name', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { item_id: itemId, item_option_id: itemOptionId, name, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/item_option_values', body, query);
  }

  private async getItemOptionValue(itemIndex: number): Promise<any> {
    const itemOptionValueId = this.getNodeParameter('itemOptionValueId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/item_option_values/${itemOptionValueId}`, undefined, query);
  }

  private async getAllItemOptionValues(itemIndex: number): Promise<any> {
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

  private async updateItemOptionValue(itemIndex: number): Promise<any> {
    const itemOptionValueId = this.getNodeParameter('itemOptionValueId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/item_option_values/${itemOptionValueId}`, body, query);
  }

  private async deleteItemOptionValue(itemIndex: number): Promise<any> {
    const itemOptionValueId = this.getNodeParameter('itemOptionValueId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_option_values/${itemOptionValueId}`);
  }

  // Item Tier operations
  private async createItemTier(itemIndex: number): Promise<any> {
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

  private async getItemTier(itemIndex: number): Promise<any> {
    const itemTierId = this.getNodeParameter('itemTierId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/item_tiers/${itemTierId}`, undefined, query);
  }

  private async getAllItemTiers(itemIndex: number): Promise<any> {
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

  private async updateItemTier(itemIndex: number): Promise<any> {
    const itemTierId = this.getNodeParameter('itemTierId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/item_tiers/${itemTierId}`, body, query);
  }

  private async deleteItemTier(itemIndex: number): Promise<any> {
    const itemTierId = this.getNodeParameter('itemTierId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/item_tiers/${itemTierId}`);
  }

  // Line Item operations
  private async createLineItem(itemIndex: number): Promise<any> {
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
  private async createManufacturer(itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/manufacturers', body, query);
  }

  private async getManufacturer(itemIndex: number): Promise<any> {
    const manufacturerId = this.getNodeParameter('manufacturerId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/manufacturers/${manufacturerId}`, undefined, query);
  }

  private async getAllManufacturers(itemIndex: number): Promise<any> {
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

  private async updateManufacturer(itemIndex: number): Promise<any> {
    const manufacturerId = this.getNodeParameter('manufacturerId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/manufacturers/${manufacturerId}`, body, query);
  }

  private async deleteManufacturer(itemIndex: number): Promise<any> {
    const manufacturerId = this.getNodeParameter('manufacturerId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/manufacturers/${manufacturerId}`);
  }

  // Quote operations
  private async createQuote(itemIndex: number): Promise<any> {
    const templateId = this.getNodeParameter('template_id', itemIndex) as string;
    const contactId = this.getNodeParameter('contact_id', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { template_id: templateId, contact_id: contactId, ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/quotes', body, query);
  }

  private async getQuote(itemIndex: number): Promise<any> {
    const quoteId = this.getNodeParameter('quoteId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/quotes/${quoteId}`, undefined, query);
  }

  private async getAllQuotes(itemIndex: number): Promise<any> {
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

  private async updateQuote(itemIndex: number): Promise<any> {
    const quoteId = this.getNodeParameter('quoteId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/quotes/${quoteId}`, body, query);
  }

  private async deleteQuote(itemIndex: number): Promise<any> {
    const quoteId = this.getNodeParameter('quoteId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/quotes/${quoteId}`);
  }

  // Quote Template operations
  private async getQuoteTemplate(itemIndex: number): Promise<any> {
    const quoteTemplateId = this.getNodeParameter('quoteTemplateId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/quote_templates/${quoteTemplateId}`, undefined, query);
  }

  private async getAllQuoteTemplates(itemIndex: number): Promise<any> {
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
  private async createSupplier(itemIndex: number): Promise<any> {
    const name = this.getNodeParameter('name', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body: any = { name };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'POST', '/suppliers', body, query);
  }

  private async getSupplier(itemIndex: number): Promise<any> {
    const supplierId = this.getNodeParameter('supplierId', itemIndex) as string;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const query: any = {};
    if (options.fields) {
      query.fields = options.fields.join(',');
    }

    return quoterApiRequest.call(this, 'GET', `/suppliers/${supplierId}`, undefined, query);
  }

  private async getAllSuppliers(itemIndex: number): Promise<any> {
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

  private async updateSupplier(itemIndex: number): Promise<any> {
    const supplierId = this.getNodeParameter('supplierId', itemIndex) as string;
    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
    const options = this.getNodeParameter('options', itemIndex, {}) as any;

    const body = { ...additionalFields };
    const query = options.fields ? { fields: options.fields.join(',') } : {};

    return quoterApiRequest.call(this, 'PATCH', `/suppliers/${supplierId}`, body, query);
  }

  private async deleteSupplier(itemIndex: number): Promise<any> {
    const supplierId = this.getNodeParameter('supplierId', itemIndex) as string;
    return quoterApiRequest.call(this, 'DELETE', `/suppliers/${supplierId}`);
  }
}
