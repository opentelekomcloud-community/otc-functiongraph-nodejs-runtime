# Samples on how to invoke FunctionGraph functions

## Prerequisites

### Environment variables

| Environment variable   | Value                    |
| --------------------   | ------------------------ |
| ``OTC_SDK_PROJECT_ID`` | Project ID
| ``OTC_SDK_REGION``     | Region, defualt: "eu-de"
| ``OTC_SDK_AK``         | Access Key (*)
| ``OTC_SDK_SK``         | Secret Key

(*) with permission to invoke FunctionGraph.

### Deployed FunctionGraph

Deploy following FunctionGraph function using console:

* **Project** : ``OTC_SDK_PROJECT_ID`` (see above)
* **Region**: ``OTC_SDK_REGION`` (see above)
* **Name**: ``nodejs-sample-invoke-function``
* **Runtime**: ``Node.js 20.15``
* **Version**: ``latest``
* **Application**: ``default``
* **Code:** see: [src-fg/index.js](./src-fg/index.js)

## Synchronous invocation

### Using NodeJS http

**code:** [src/invokeSync_AKSK.js](./src/invokeSync_AKSK.js)

```bash
npm run invokeSyncAKSK
```

### Using NodeJS fetch

**code:** [src/invokeSyncFetch_AKSK.js](./src/invokeSyncFetch_AKSK.js)

```bash
npm run invokeSyncFetchAKSK
```

## ASynchronous invocation

### Using NodeJS http

**code:** [src/invokeASync_AKSK.js](./src/invokeASync_AKSK.js)

```bash
npm run invokeASyncAKSK
```

### Using NodeJS fetch

**code:** [src/invokeASyncFetch_AKSK.js](./src/invokeASyncFetch_AKSK.js)

```bash
npm run invokeASyncFetchAKSK
```
