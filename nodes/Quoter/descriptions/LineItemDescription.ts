import { INodeProperties } from 'n8n-workflow';

export const lineItemOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['lineItem'] },
    },
    options: [{ name: 'Create', value: 'create', action: 'Create a line item' }],
    default: 'create',
  },
];

export const lineItemFields: INodeProperties[] = [
  {
    displayName: 'Quote ID',
    name: 'quote_id',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['lineItem'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The ID of the quote',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['lineItem'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the line item',
  },
  {
    displayName: 'Category',
    name: 'category',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['lineItem'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The category of the line item',
  },
  {
    displayName: 'Quantity',
    name: 'quantity',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        resource: ['lineItem'],
        operation: ['create'],
      },
    },
    typeOptions: {
      minValue: 0,
      numberPrecision: 2,
    },
    default: 1,
    description: 'The quantity of the line item',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['lineItem'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Line item description',
      },
      {
        displayName: 'Manufacturer',
        name: 'manufacturer',
        type: 'string',
        default: '',
        description: 'Manufacturer name',
      },
      {
        displayName: 'Supplier',
        name: 'supplier',
        type: 'string',
        default: '',
        description: 'Supplier name',
      },
      {
        displayName: 'Supplier SKU',
        name: 'supplier_sku',
        type: 'string',
        default: '',
        description: 'Supplier SKU',
      },
      {
        displayName: 'Part Number',
        name: 'part_number',
        type: 'string',
        default: '',
        description: 'Part number',
      },
      {
        displayName: 'Unit Price',
        name: 'unit_price',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Unit price as decimal',
      },
      {
        displayName: 'Unit Cost',
        name: 'unit_cost',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'Unit cost as decimal',
      },
      {
        displayName: 'Recurring',
        name: 'recurring',
        type: 'boolean',
        default: false,
        description: 'Whether the line item is recurring',
      },
      {
        displayName: 'Taxable',
        name: 'taxable',
        type: 'boolean',
        default: false,
        description: 'Whether the line item is taxable',
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
        resource: ['lineItem'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Fields',
        name: 'fields',
        type: 'multiOptions',
        options: [
          { name: 'Category', value: 'category' },
          { name: 'Created At', value: 'created_at' },
          { name: 'Description', value: 'description' },
          { name: 'ID', value: 'id' },
          { name: 'Manufacturer', value: 'manufacturer' },
          { name: 'Modified At', value: 'modified_at' },
          { name: 'Name', value: 'name' },
          { name: 'Part Number', value: 'part_number' },
          { name: 'Quantity', value: 'quantity' },
          { name: 'Quote', value: 'quote' },
          { name: 'Quote ID', value: 'quote_id' },
          { name: 'Recurring', value: 'recurring' },
          { name: 'Supplier', value: 'supplier' },
          { name: 'Supplier SKU', value: 'supplier_sku' },
          { name: 'Taxable', value: 'taxable' },
          { name: 'Unit Cost', value: 'unit_cost' },
          { name: 'Unit Price', value: 'unit_price' },
        ],
        default: [],
        description: 'Fields to include in the response',
      },
    ],
  },
];

export const lineItemDescription = [...lineItemOperations, ...lineItemFields];
