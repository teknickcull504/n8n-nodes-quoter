import { INodeProperties } from 'n8n-workflow';

export const itemTierOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['itemTier'] },
    },
    options: [
      { name: 'Create', value: 'create', action: 'Create an item tier' },
      { name: 'Delete', value: 'delete', action: 'Delete an item tier' },
      { name: 'Get', value: 'get', action: 'Get an item tier' },
      { name: 'Get Many', value: 'getAll', action: 'Get many item tiers' },
      { name: 'Update', value: 'update', action: 'Update an item tier' },
    ],
    default: 'getAll',
  },
];

export const itemTierFields: INodeProperties[] = [
  {
    displayName: 'Item Tier ID',
    name: 'itemTierId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemTier'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the item tier',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['itemTier'],
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
        resource: ['itemTier'],
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
    displayName: 'Item ID',
    name: 'item_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemTier'],
        operation: ['create', 'getAll'],
      },
    },
    default: '',
    description: 'The ID of the item',
  },
  {
    displayName: 'Lower Boundary',
    name: 'lower_boundary',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemTier'],
        operation: ['create'],
      },
    },
    default: 0,
    description: 'Lower quantity boundary for this tier',
  },
  {
    displayName: 'Price (Decimal)',
    name: 'price_decimal',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemTier'],
        operation: ['create'],
      },
    },
    typeOptions: {
      numberPrecision: 2,
    },
    default: 0,
    description: 'Price as decimal number',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['itemTier'],
        operation: ['create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Cost (Decimal)',
        name: 'cost_decimal',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Cost as decimal number',
      },
      {
        displayName: 'Cost Type',
        name: 'cost_type',
        type: 'options',
        options: [
          { name: 'Amount', value: 'amount' },
          { name: 'Percentage', value: 'percentage' },
        ],
        default: 'amount',
        description: 'Whether cost is an amount or percentage',
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
        resource: ['itemTier'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Item ID',
        name: 'itemId',
        type: 'string',
        default: '',
        description: 'Filter by item ID',
      },
      {
        displayName: 'Created After',
        name: 'createdAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter tiers created after this date',
      },
      {
        displayName: 'Modified After',
        name: 'modifiedAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter tiers modified after this date',
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
        resource: ['itemTier'],
        operation: ['get', 'getAll', 'create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'multiOptions',
        options: [
          { name: 'Cost Decimal', value: 'cost_decimal' },
          { name: 'Cost Type', value: 'cost_type' },
          { name: 'Created At', value: 'created_at' },
          { name: 'ID', value: 'id' },
          { name: 'Item', value: 'item' },
          { name: 'Item ID', value: 'item_id' },
          { name: 'Lower Boundary', value: 'lower_boundary' },
          { name: 'Modified At', value: 'modified_at' },
          { name: 'Price Decimal', value: 'price_decimal' },
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
          { name: 'Lower Boundary (Asc)', value: '+lower_boundary' },
          { name: 'Lower Boundary (Desc)', value: '-lower_boundary' },
        ],
        default: '',
        description: 'Sort results by this field',
      },
    ],
  },
];

export const itemTierDescription = [...itemTierOperations, ...itemTierFields];
