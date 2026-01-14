import { INodeProperties } from 'n8n-workflow';

export const itemGroupItemAssignmentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['itemGroupItemAssignment'] },
    },
    options: [
      { name: 'Create', value: 'create', action: 'Create an item group item assignment' },
      { name: 'Delete', value: 'delete', action: 'Delete an item group item assignment' },
      { name: 'Get', value: 'get', action: 'Get an item group item assignment' },
      { name: 'Get Many', value: 'getAll', action: 'Get many item group item assignments' },
    ],
    default: 'getAll',
  },
];

export const itemGroupItemAssignmentFields: INodeProperties[] = [
  {
    displayName: 'Item Group Item Assignment ID',
    name: 'itemGroupItemAssignmentId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemGroupItemAssignment'],
        operation: ['get', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the item group item assignment',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['itemGroupItemAssignment'],
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
        resource: ['itemGroupItemAssignment'],
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
        resource: ['itemGroupItemAssignment'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The ID of the item',
  },
  {
    displayName: 'Item Group ID',
    name: 'item_group_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemGroupItemAssignment'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The ID of the item group',
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['itemGroupItemAssignment'],
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
        displayName: 'Item Group ID',
        name: 'itemGroupId',
        type: 'string',
        default: '',
        description: 'Filter by item group ID',
      },
      {
        displayName: 'Created After',
        name: 'createdAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter assignments created after this date',
      },
      {
        displayName: 'Modified After',
        name: 'modifiedAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter assignments modified after this date',
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
        resource: ['itemGroupItemAssignment'],
        operation: ['get', 'getAll', 'create'],
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
          { name: 'Item', value: 'item' },
          { name: 'Item Group', value: 'item_group' },
          { name: 'Item Group ID', value: 'item_group_id' },
          { name: 'Item ID', value: 'item_id' },
          { name: 'Modified At', value: 'modified_at' },
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
        ],
        default: '',
        description: 'Sort results by this field',
      },
    ],
  },
];

export const itemGroupItemAssignmentDescription = [
  ...itemGroupItemAssignmentOperations,
  ...itemGroupItemAssignmentFields,
];
