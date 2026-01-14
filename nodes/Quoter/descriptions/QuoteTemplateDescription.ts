import { INodeProperties } from 'n8n-workflow';

export const quoteTemplateOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['quoteTemplate'] },
    },
    options: [
      { name: 'Get', value: 'get', action: 'Get a quote template' },
      { name: 'Get Many', value: 'getAll', action: 'Get many quote templates' },
    ],
    default: 'getAll',
  },
];

export const quoteTemplateFields: INodeProperties[] = [
  {
    displayName: 'Quote Template ID',
    name: 'quoteTemplateId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['quoteTemplate'],
        operation: ['get'],
      },
    },
    default: '',
    description: 'The ID of the quote template',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['quoteTemplate'],
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
        resource: ['quoteTemplate'],
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
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['quoteTemplate'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Title Contains',
        name: 'titleContains',
        type: 'string',
        default: '',
        description: 'Filter templates where title contains this value',
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
        resource: ['quoteTemplate'],
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
          { name: 'ID', value: 'id' },
          { name: 'Modified At', value: 'modified_at' },
          { name: 'Slug', value: 'slug' },
          { name: 'Title', value: 'title' },
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
          { name: 'Title (Asc)', value: '+title' },
          { name: 'Title (Desc)', value: '-title' },
        ],
        default: '',
        description: 'Sort results by this field',
      },
    ],
  },
];

export const quoteTemplateDescription = [...quoteTemplateOperations, ...quoteTemplateFields];
