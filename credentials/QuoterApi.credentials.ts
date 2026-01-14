import {
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class QuoterApi implements ICredentialType {
  name = 'quoterApi';

  displayName = 'Quoter API';

  documentationUrl = 'https://docs.quoter.com/api';

  properties: INodeProperties[] = [
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'string',
      default: '',
      required: true,
      description: 'OAuth Client ID from Quoter Account > API Keys',
    },
    {
      displayName: 'Client Secret',
      name: 'clientSecret',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'OAuth Client Secret from Quoter Account > API Keys',
    },
  ];
}
