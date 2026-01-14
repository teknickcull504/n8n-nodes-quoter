import { INodeProperties } from 'n8n-workflow';

export const itemOptionValueOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['itemOptionValue'] },
    },
    options: [
      { name: 'Create', value: 'create', action: 'Create an item option value' },
      { name: 'Delete', value: 'delete', action: 'Delete an item option value' },
      { name: 'Get', value: 'get', action: 'Get an item option value' },
      { name: 'Get Many', value: 'getAll', action: 'Get many item option values' },
      { name: 'Update', value: 'update', action: 'Update an item option value' },
    ],
    default: 'getAll',
  },
];

export const itemOptionValueFields: INodeProperties[] = [
  {
    displayName: 'Item Option Value ID',
    name: 'itemOptionValueId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemOptionValue'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the item option value',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['itemOptionValue'],
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
        resource: ['itemOptionValue'],
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
        resource: ['itemOptionValue'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The ID of the item',
  },
  {
    displayName: 'Item Option ID',
    name: 'item_option_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemOptionValue'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The ID of the item option',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemOptionValue'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the item option value',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['itemOptionValue'],
        operation: ['create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'Option value code',
      },
      {
        displayName: 'Price (Decimal)',
        name: 'price_decimal',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Price as decimal number',
      },
      {
        displayName: 'Pricing Scheme',
        name: 'pricing_scheme',
        type: 'options',
        options: [
          { name: 'Amount', value: 'amount' },
          { name: 'Percentage', value: 'percentage' },
          { name: 'Compound Percentage', value: 'compound_percentage' },
        ],
        default: 'amount',
        description: 'Pricing scheme type',
      },
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
      {
        displayName: 'Sort Order',
        name: 'sort_order',
        type: 'number',
        default: 0,
        description: 'Sort order',
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
        resource: ['itemOptionValue'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Name Contains',
        name: 'nameContains',
        type: 'string',
        default: '',
        description: 'Filter option values where name contains this value',
      },
      {
        displayName: 'Created After',
        name: 'createdAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter option values created after this date',
      },
      {
        displayName: 'Modified After',
        name: 'modifiedAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter option values modified after this date',
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
        resource: ['itemOptionValue'],
        operation: ['get', 'getAll', 'create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'multiOptions',
        options: [
          { name: 'Code', value: 'code' },
          { name: 'Cost Decimal', value: 'cost_decimal' },
          { name: 'Cost Type', value: 'cost_type' },
          { name: 'Created At', value: 'created_at' },
          { name: 'ID', value: 'id' },
          { name: 'Item', value: 'item' },
          { name: 'Item ID', value: 'item_id' },
          { name: 'Item Option', value: 'item_option' },
          { name: 'Item Option ID', value: 'item_option_id' },
          { name: 'Modified At', value: 'modified_at' },
          { name: 'Name', value: 'name' },
          { name: 'Price Decimal', value: 'price_decimal' },
          { name: 'Pricing Scheme', value: 'pricing_scheme' },
          { name: 'Sort Order', value: 'sort_order' },
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
          { name: 'Sort Order (Asc)', value: '+sort_order' },
          { name: 'Sort Order (Desc)', value: '-sort_order' },
        ],
        default: '',
        description: 'Sort results by this field',
      },
    ],
  },
];

export const itemOptionValueDescription = [...itemOptionValueOperations, ...itemOptionValueFields];
