import { INodeProperties } from 'n8n-workflow';

export const dataFeedSupplierItemOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['dataFeedSupplierItem'] },
    },
    options: [{ name: 'Get Many', value: 'getAll', action: 'Get many data feed supplier items' }],
    default: 'getAll',
  },
];

export const dataFeedSupplierItemFields: INodeProperties[] = [
  {
    displayName: 'MPNs',
    name: 'mpns',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['dataFeedSupplierItem'],
        operation: ['getAll'],
      },
    },
    default: '',
    description: 'Comma-separated list of Manufacturer Part Numbers (MPNs) to query',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['dataFeedSupplierItem'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['dataFeedSupplierItem'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    default: 50,
    description: 'Max number of results to return',
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['dataFeedSupplierItem'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'multiOptions',
        options: [
          { name: 'Category', value: 'category' },
          { name: 'ID', value: 'id' },
          { name: 'MPN', value: 'mpn' },
          { name: 'Name', value: 'name' },
          { name: 'Price Amount Decimal', value: 'price_amount_decimal' },
          { name: 'Semantic Item ID', value: 'semantic_item_id' },
          { name: 'SKU', value: 'sku' },
          { name: 'Supplier', value: 'supplier' },
          { name: 'Supplier Default Taxable', value: 'supplier_default_taxable' },
          { name: 'Supplier ID', value: 'supplier_id' },
          { name: 'Supplier Name', value: 'supplier_name' },
          { name: 'Taxable', value: 'taxable' },
          { name: 'Warehouses', value: 'warehouses' },
          { name: 'Weight Decimal', value: 'weight_decimal' },
        ],
        default: [],
        description: 'Fields to include in the response',
      },
    ],
  },
];

export const dataFeedSupplierItemDescription = [
  ...dataFeedSupplierItemOperations,
  ...dataFeedSupplierItemFields,
];
