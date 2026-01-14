import { INodeProperties } from 'n8n-workflow';

export const supplierOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['supplier'] },
    },
    options: [
      { name: 'Create', value: 'create', action: 'Create a supplier' },
      { name: 'Delete', value: 'delete', action: 'Delete a supplier' },
      { name: 'Get', value: 'get', action: 'Get a supplier' },
      { name: 'Get Many', value: 'getAll', action: 'Get many suppliers' },
      { name: 'Update', value: 'update', action: 'Update a supplier' },
    ],
    default: 'getAll',
  },
];

export const supplierFields: INodeProperties[] = [
  {
    displayName: 'Supplier ID',
    name: 'supplierId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the supplier',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['supplier'],
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
        resource: ['supplier'],
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
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the supplier',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the supplier',
      },
    ],
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Name Contains',
        name: 'nameContains',
        type: 'string',
        default: '',
        description: 'Filter suppliers where name contains this value',
      },
      {
        displayName: 'Created After',
        name: 'createdAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter suppliers created after this date',
      },
      {
        displayName: 'Modified After',
        name: 'modifiedAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter suppliers modified after this date',
      },
    ],
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['supplier'],
        operation: ['get', 'getAll', 'create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'multiOptions',
        options: [
          { name: 'Created At', value: 'created_at' },
          { name: 'ID', value: 'id' },
          { name: 'Modified At', value: 'modified_at' },
          { name: 'Name', value: 'name' },
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

export const supplierDescription = [...supplierOperations, ...supplierFields];
