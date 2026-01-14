import { INodeProperties } from 'n8n-workflow';

export const dataFeedSupplierOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['dataFeedSupplier'] },
    },
    options: [
      { name: 'Get', value: 'get', action: 'Get a data feed supplier' },
      { name: 'Get Many', value: 'getAll', action: 'Get many data feed suppliers' },
    ],
    default: 'getAll',
  },
];

export const dataFeedSupplierFields: INodeProperties[] = [
  {
    displayName: 'Data Feed Supplier ID',
    name: 'dataFeedSupplierId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['dataFeedSupplier'],
        operation: ['get'],
      },
    },
    default: '',
    description: 'The ID of the data feed supplier',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['dataFeedSupplier'],
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
        resource: ['dataFeedSupplier'],
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
        resource: ['dataFeedSupplier'],
        operation: ['get', 'getAll'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'multiOptions',
        options: [
          { name: 'Created At', value: 'created_at' },
          { name: 'Default Taxable', value: 'default_taxable' },
          { name: 'Field Mapping', value: 'field_mapping' },
          { name: 'ID', value: 'id' },
          { name: 'Modified At', value: 'modified_at' },
          { name: 'Name', value: 'name' },
          { name: 'URL', value: 'url' },
        ],
        default: [],
        description: 'Fields to include in the response',
      },
      {
        displayName: 'Sort By',
        name: 'sortBy',
        type: 'options',
        options: [
          { name: 'Created At (Asc)', value: '+created_at' },
          { name: 'Created At (Desc)', value: '-created_at' },
          { name: 'Name (Asc)', value: '+name' },
          { name: 'Name (Desc)', value: '-name' },
        ],
        default: '',
        description: 'Sort results by this field',
      },
    ],
  },
];

export const dataFeedSupplierDescription = [
  ...dataFeedSupplierOperations,
  ...dataFeedSupplierFields,
];
