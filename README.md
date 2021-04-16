# getir-test-api

An expressJS with typescript application to fetch filtered records stored in a mongodb database. 

## How to set up locally?

- Install NodeJS
- Install NPM
- clone the repository using `git clone https://github.com/megatrongh/getir-test-api.git`
- change directory into getir-test-api and run;
  - `npm i`
  - `npm run dev`

## To run tests

- run `npm test`

## API Docs
`https://getir-api-server.herokuapp.com/api-docs/`

## API Endpoint
`https://getir-api-server.herokuapp.com/`


### Sample Request Payload
```
POST /api/v1/records
Content-Type: application/json
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```
### Sample Response Payload
```
{
  "code": 0,
  "msg": "Success",
  "records": [
    {
      "key": "jOjBYTLV",
      "createdAt": "2016-11-13T19:54:23.677Z",
      "totalCount": 2954
    },
    {
      "key": "fEWwrjug",
      "createdAt": "2016-10-30T22:49:27.236Z",
      "totalCount": 2935
    },
    {
      "key": "plSuXweN",
      "createdAt": "2016-10-25T11:36:28.069Z",
      "totalCount": 2970
    }
  ]
}
