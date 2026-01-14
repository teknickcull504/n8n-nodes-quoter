# n8n-nodes-quoter

[![npm version](https://img.shields.io/npm/v/n8n-nodes-quoter.svg)](https://www.npmjs.com/package/n8n-nodes-quoter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An n8n community node for interacting with the [Quoter API](https://quoter.com) - a quoting platform for MSPs (Managed Service Providers).

## Features

- **Full API Coverage**: Supports all 15 Quoter API resources
- **OAuth 2.0 Authentication**: Automatic token management with refresh
- **Rate Limiting**: Built-in handling for API rate limits with exponential backoff
- **Pagination**: Support for both limited and unlimited result sets
- **Field Filtering**: Select specific fields to return in responses
- **Advanced Filtering**: Filter results by various criteria
- **Error Handling**: Comprehensive error parsing and reporting

## Resources Supported

1. **Categories** - Product/service categories
2. **Contacts** - People/contacts in the system
3. **Items** - Products and services
4. **Item Groups** - Groupings of items
5. **Item Group Item Assignments** - Assign items to groups
6. **Item Options** - Options for items
7. **Item Option Values** - Values for item options
8. **Item Tiers** - Pricing tiers for items
9. **Manufacturers** - Product manufacturers
10. **Suppliers** - Product suppliers
11. **Quotes** - Sales quotes
12. **Quote Templates** - Templates for quotes
13. **Line Items** - Items on quotes
14. **Data Feed Suppliers** - External data feed suppliers
15. **Data Feed Supplier Items** - Items from data feeds

## Installation

### For n8n Cloud

This node is available in the n8n community nodes catalog. Search for "Quoter" when adding a new node.

### For Self-Hosted n8n

1. Install the package:
```bash
npm install n8n-nodes-quoter
```

2. Restart your n8n instance.

## Setup

1. Get your API credentials from Quoter:
   - Go to your Quoter account
   - Navigate to Account > API Keys
   - Create a new API key if needed
   - Copy your Client ID and Client Secret

2. In n8n:
   - Add a Quoter node to your workflow
   - Click on "Create New Credential"
   - Enter your Client ID and Client Secret
   - Save the credential

## Usage

### Basic Example: Get All Quotes

1. Add a Quoter node
2. Select "Quote" as the resource
3. Select "Get Many" as the operation
4. Configure filters and options as needed
5. Execute the workflow

### Create a Quote

1. Add a Quoter node
2. Select "Quote" as the resource
3. Select "Create" as the operation
4. Enter the required fields:
   - Template ID
   - Contact ID
5. Add any additional fields
6. Execute the workflow

### Filter Examples

- **Get quotes created after a date**: Use the "Created After" filter
- **Get contacts by email**: Use the "Email Contains" filter
- **Get items by category**: Use the "Category ID" filter

## Operations

Each resource supports different operations:

- **Create**: Create a new record
- **Get**: Get a single record by ID
- **Get Many**: Get multiple records (with filtering and pagination)
- **Update**: Update an existing record (PATCH)
- **Delete**: Delete a record

Note: Some resources are read-only (Quote Templates, Data Feed Suppliers, Data Feed Supplier Items) and only support Get/Get Many operations.

## Field Selection

You can specify which fields to return in the response using the "Options" section:

1. Expand the "Options" section
2. Select fields from the "Fields" multi-select
3. Only selected fields will be returned

## Sorting

Sort results using the "Sort By" option:

- Select a field and direction (Ascending/Descending)
- Multiple sort fields can be specified (comma-separated)

## Rate Limiting

The node automatically handles Quoter's rate limit of 5 requests per second:

- Automatically retries on 429 (Too Many Requests) responses
- Uses exponential backoff for retries
- Maximum of 3 retry attempts

## Authentication

The node uses OAuth 2.0 Client Credentials flow:

- Access tokens are valid for 1 hour
- Refresh tokens are valid for 24 hours
- Tokens are automatically refreshed when expired
- No manual token management required

## Error Handling

The node provides detailed error messages:

- Parses Quoter API error responses
- Includes error codes, titles, and details
- Continues on error if "Continue on Fail" is enabled

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- TypeScript 4.9+

### Building

```bash
npm install
npm run build
```

### Development Mode

```bash
npm run dev
```

### Linting

```bash
npm run lint
npm run lintfix
```

### Testing

This node follows n8n's community node standards. Test your workflows in n8n after installation.

## API Documentation

For detailed API documentation, visit:
- [Quoter API Documentation](https://docs.quoter.com/api)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues and questions:

- Open an issue on GitHub
- Check the [Quoter API Documentation](https://docs.quoter.com/api)
- Review n8n community node development guidelines

## Changelog

### 0.1.0

- Initial release
- Support for all 15 Quoter API resources
- OAuth 2.0 authentication
- Rate limiting and error handling
- Field filtering and sorting
- Pagination support
