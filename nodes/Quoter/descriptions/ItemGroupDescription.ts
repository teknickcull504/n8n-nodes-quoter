import { INodeProperties } from 'n8n-workflow';

export const itemGroupOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['itemGroup'] },
    },
    options: [
      { name: 'Create', value: 'create', action: 'Create an item group' },
      { name: 'Delete', value: 'delete', action: 'Delete an item group' },
      { name: 'Get', value: 'get', action: 'Get an item group' },
      { name: 'Get Many', value: 'getAll', action: 'Get many item groups' },
      { name: 'Update', value: 'update', action: 'Update an item group' },
    ],
    default: 'getAll',
  },
];

export const itemGroupFields: INodeProperties[] = [
  {
    displayName: 'Item Group ID',
    name: 'itemGroupId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['itemGroup'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the item group',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['itemGroup'],
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
        resource: ['itemGroup'],
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
        resource: ['itemGroup'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the item group',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['itemGroup'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the item group',
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
        resource: ['itemGroup'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Name Contains',
        name: 'nameContains',
        type: 'string',
        default: '',
        description: 'Filter item groups where name contains this value',
      },
      {
        displayName: 'Created After',
        name: 'createdAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter item groups created after this date',
      },
      {
        displayName: 'Modified After',
        name: 'modifiedAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter item groups modified after this date',
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
        resource: ['itemGroup'],
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

export const itemGroupDescription = [...itemGroupOperations, ...itemGroupFields];
