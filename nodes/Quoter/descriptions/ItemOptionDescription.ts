import { INodeProperties } from 'n8n-workflow';

export const itemOptionOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['itemOption'] },
    },
    options: [
      { name: 'Create', value: 'create', action: 'Create an item option' },
      { name: 'Delete', value: 'delete', action: 'Delete an item option' },
      { name: 'Get', value: 'get', action: 'Get an item option' },
      { name: 'Get Many', value: 'getAll', action: 'Get many item options' },
      { name: 'Update', value: 'update', action: 'Update an item option' },
    ],
    default: 'getAll',
  },
];

export const itemOptionFields: INodeProperties[] = [
  {
    displayName: 'Item ID',
    name: 'itemId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemOption'],
        operation: ['getAll', 'create'],
      },
    },
    default: '',
    description: 'The ID of the item',
  },
  {
    displayName: 'Item Option ID',
    name: 'itemOptionId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemOption'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the item option',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['itemOption'],
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
        resource: ['itemOption'],
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
        resource: ['itemOption'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the item option',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['itemOption'],
        operation: ['create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Item ID',
        name: 'item_id',
        type: 'string',
        default: '',
        description: 'The ID of the item',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Option description',
      },
      {
        displayName: 'Extended Description',
        name: 'extended_description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Extended description',
      },
      {
        displayName: 'Required',
        name: 'required',
        type: 'boolean',
        default: false,
        description: 'Whether the option is required',
      },
      {
        displayName: 'Allow Multiple Values',
        name: 'allow_multiple_values',
        type: 'boolean',
        default: false,
        description: 'Whether to allow multiple values',
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
        resource: ['itemOption'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Name Contains',
        name: 'nameContains',
        type: 'string',
        default: '',
        description: 'Filter options where name contains this value',
      },
      {
        displayName: 'Created After',
        name: 'createdAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter options created after this date',
      },
      {
        displayName: 'Modified After',
        name: 'modifiedAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter options modified after this date',
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
        resource: ['itemOption'],
        operation: ['get', 'getAll', 'create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'multiOptions',
        options: [
          { name: 'Allow Multiple Values', value: 'allow_multiple_values' },
          { name: 'Created At', value: 'created_at' },
          { name: 'Description', value: 'description' },
          { name: 'Extended Description', value: 'extended_description' },
          { name: 'ID', value: 'id' },
          { name: 'Item', value: 'item' },
          { name: 'Item ID', value: 'item_id' },
          { name: 'Modified At', value: 'modified_at' },
          { name: 'Name', value: 'name' },
          { name: 'Required', value: 'required' },
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

export const itemOptionDescription = [...itemOptionOperations, ...itemOptionFields];
