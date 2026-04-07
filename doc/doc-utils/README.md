# doc-utils

## Create files for bundled libraries

Used to generate documentation files based on installed libraries
in backend.

Following files will be created in folder ``/doc/source/devguide/bundled_libraries``:

- _index.rst
- bundled_libraries_nodejs[VERSION].rst

Requires src-fg/index.js installed as FunctionGraph with:
- Function type: event-function from scratch
- Name: ``getNodeJSRuntimeInfo``
- Runtime: nodejs20.15
- Project: OTC_SDK_PROJECT_ID
- Region: OTC_SDK_REGION

To run, following environment variables must be set on client side:

- Project: OTC_SDK_PROJECT_ID
- Region: OTC_SDK_REGION
- Access Key: OTC_SDK_AK
- Secret key: OTC_SDK_SK

To create files use: 

```bash
npm run createLibraryDocs
```

