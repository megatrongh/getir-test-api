import dotenv from 'dotenv';

dotenv.config();

const documentation = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Getir api server',
    description: 'Records Filtering',
    contact: {
      name: 'Klogo Gibson Selasi',
      email: 'klogogibson50@gmail.com',
      url: '',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server',
    },
    {
      url: process.env.APP_URL,
      description: 'Production server',
    },
  ],
  tags: [
    {
      name: 'Getir api server',
    },
  ],
  paths: {
    '/api/v1/records': {
      post: {
        tags: [] as Array<string>,
        description: 'Filter records',
        operationId: 'fetchRecords',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Payload',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'success filtered records fetch',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Response',
                },
                example: {
                  code: 0,
                  msg: 'Success',
                  records: [
                    {
                      key: 'STFGmUkL',
                      createdAt: '2016-01-29T13:18:38.649Z',
                      totalCount: 37,
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  code: 3,
                  msg: 'ValidationError: "maxCount" is required',
                  records: [] as Array<string>,
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      startDate: {
        type: 'string',
        description: 'Start Date in the format YYYY-MM-DD',
        example: '2016-01-26',
      },
      endDate: {
        type: 'string',
        description: 'End Date in the format YYYY-MM-DD',
        example: '2018-02-02',
      },
      minCount: {
        type: 'integer',
        description: 'Minimum Count Value',
        example: 2700,
      },
      maxCount: {
        type: 'integer',
        description: 'Maximum Count Value',
        example: 3000,
      },
      key: {
        type: 'string',
        description: 'Start Date',
        example: 'ROYQdRsl',
      },
      createdAt: {
        type: 'string',
        description: 'Date the record was persisted in the database',
        example: '2016-01-29T13:18:38.649Z',
      },
      totalCount: {
        type: 'integer',
        description: 'Total Count',
        example: 2700,
      },
      Payload: {
        type: 'object',
        properties: {
          startDate: {
            $ref: '#/components/schemas/startDate',
          },
          endDate: {
            $ref: '#/components/schemas/endDate',
          },
          minCount: {
            $ref: '#/components/schemas/minCount',
          },
          maxCount: {
            $ref: '#/components/schemas/maxCount',
          },
        },
      },
      Record: {
        type: 'object',
        properties: {
          key: {
            $ref: '#/components/schemas/key',
          },
          createdAt: {
            $ref: '#/components/schemas/createdAt',
          },
          totalCount: {
            $ref: '#/components/schemas/totalCount',
          },
        },
      },
      Records: {
        type: 'object',
        properties: {
          records: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Record',
            },
          },
        },
      },
      Response: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            example: 0,
          },
          msg: {
            type: 'string',
            example: 'Success',
          },
          records: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Record',
            },
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          msg: {
            type: 'string',
            example: 'Validation Error',
          }
        },
      },
    },
  },
};

export default documentation;
