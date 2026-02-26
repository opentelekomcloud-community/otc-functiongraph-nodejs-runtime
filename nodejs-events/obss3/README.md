# OBS S3 Event TypeScript Implementation

This directory contains TypeScript definitions and JavaScript classes for the OBS (Object Storage Service) S3 Event handler.

## Files

- **obss3event.js** - JavaScript class implementation
- **obss3event.d.ts** - TypeScript type definitions and class declarations
- **tests/obss3event.test.ts** - TypeScript test suite
- **tests/obss3event.test.js** - JavaScript test file
- **tests/obss3_event.json** - Test data
- **tsconfig.json** - TypeScript configuration

## Installation

Install the development dependencies:

```bash
npm install
```

## Running Tests

### JavaScript tests
```bash
npm test
```

### TypeScript tests
```bash
npm run test:ts
```

This will:
1. Compile the TypeScript test file
2. Run the compiled JavaScript

### Build TypeScript only
```bash
npm run build
```

### Clean build artifacts
```bash
npm run clean
```

## Test Coverage

The TypeScript test suite validates:

- ✅ Event records array
- ✅ Record basic properties (event version, time, region, name)
- ✅ Request parameters (source IP address)
- ✅ User identity (principal ID)
- ✅ S3 details (configuration ID)
- ✅ S3 object properties (key, size, ETag, sequencer)
- ✅ S3 bucket properties (name, ARN, owner identity)
- ✅ JSON serialization
- ✅ Type safety with TypeScript interfaces
- ✅ Complete record processing

## Type Definitions

The `obss3event.d.ts` file provides:

### Interfaces
- `OBSS3EventData` - Complete event structure
- `OBSS3RecordData` - Individual event record structure
- `S3DetailsData` - S3 event details
- `S3ObjectData` - Object details structure
- `S3BucketData` - Bucket details structure
- `RequestParametersData` - Request parameters structure
- `UserIdentityData` - User identity structure
- `OwnerIdentityData` - Owner identity structure

### Classes
- `OBSS3Event` - Main event wrapper
- `OBSS3Record` - Record accessor methods
- `S3Details` - S3 details accessor
- `S3Object` - Object accessor methods
- `S3Bucket` - Bucket accessor methods
- `RequestParameters` - Request parameters accessor
- `UserIdentity` - User identity accessor
- `OwnerIdentity` - Owner identity accessor

## Example Usage

```typescript
import { OBSS3Event, OBSS3EventData } from './obss3event';
import eventData from './tests/obss3_event.json';

const event = new OBSS3Event(eventData as OBSS3EventData);

const records = event.getRecords();
for (const record of records) {
  console.log(`Event: ${record.getEventName()}`);
  
  const s3 = record.getS3();
  const obj = s3.getObject();
  const bucket = s3.getBucket();
  
  console.log(`Bucket: ${bucket.getName()}`);
  console.log(`Object: ${obj.getKey()}`);
  console.log(`Size: ${obj.getSize()} bytes`);
}
```

## Event Structure

OBS S3 events are triggered when objects are created, deleted, or modified in an OBS bucket. Each event contains:

- **Records**: Array of event records
- **Event Details**: Version, time, name, region
- **S3 Details**: Configuration, object, and bucket information
- **Object Details**: Key, size, ETag
- **Bucket Details**: Name, ARN, owner
- **Identity**: User and owner principal IDs
- **Request Info**: Source IP address
