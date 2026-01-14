import { INodeProperties } from 'n8n-workflow';

export const categoryOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['category'] },
    },
    options: [
      { name: 'Create', value: 'create', action: 'Create a category' },
      { name: 'Delete', value: 'delete', action: 'Delete a category' },
      { name: 'Get', value: 'get', action: 'Get a category' },
      { name: 'Get Many', value: 'getAll', action: 'Get many categories' },
      { name: 'Update', value: 'update', action: 'Update a category' },
    ],
    default: 'getAll',
  },
];

export const categoryFields: INodeProperties[] = [
  {
    displayName: 'Category ID',
    name: 'categoryId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'The ID of the category',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['category'],
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
        resource: ['category'],
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
        resource: ['category'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the category',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Parent Category ID',
        name: 'parent_category_id',
        type: 'string',
        default: '',
        description: 'ID of the parent category',
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
        resource: ['category'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Name Contains',
        name: 'nameContains',
        type: 'string',
        default: '',
        description: 'Filter categories where name contains this value',
      },
      {
        displayName: 'Parent Category ID',
        name: 'parentCategoryId',
        type: 'string',
        default: '',
        description: 'Filter by parent category ID',
      },
      {
        displayName: 'Created After',
        name: 'createdAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter categories created after this date',
      },
      {
        displayName: 'Modified After',
        name: 'modifiedAfter',
        type: 'dateTime',
        default: '',
        description: 'Filter categories modified after this date',
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
        resource: ['category'],
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
          { name: 'Parent Category', value: 'parent_category' },
          { name: 'Parent Category ID', value: 'parent_category_id' },
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

export const categoryDescription = [...categoryOperations, ...categoryFields];
