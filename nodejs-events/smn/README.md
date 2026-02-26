# SMN Event TypeScript Test

This directory contains TypeScript definitions and tests for the SMN (Simple Message Notification) Event classes.

## Files

- **smnevent.d.ts** - TypeScript type definitions and class declarations
- **tests/smnevent.test.ts** - TypeScript test suite
- **tests/smnevent.json** - Test data
- **tsconfig.json** - TypeScript configuration

## Installation

Install the development dependencies:

```bash
npm install
```

## Running Tests

### JavaScript tests (existing)
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

- ✅ Event properties (function name, request ID, timestamp)
- ✅ Event records array
- ✅ Record properties (event subscription URN, event source)
- ✅ SMN body properties (topic URN, message, subject, message ID, etc.)
- ✅ JSON serialization
- ✅ Type safety with TypeScript interfaces
- ✅ Processing of all records in test data

## Type Definitions

The `smnevent.d.ts` file provides:

### Interfaces
- `SMNBody` - Message details structure
- `SMNRecord` - Individual event record structure
- `SMNEventData` - Complete event structure

### Classes
- `SMNEvent` - Main event wrapper
- `SMNRecordClass` - Record accessor methods
- `SMNBodyClass` - Message accessor methods

## Example Usage

```typescript
import { SMNEvent, SMNEventData } from './smnevent';
import eventData from './tests/smnevent.json';

const event = new SMNEvent(eventData as SMNEventData);

console.log(event.getFunctionName());
console.log(event.getRequestId());

const records = event.getRecords();
for (const record of records) {
  const smnBody = record.getSMNBody();
  console.log(smnBody.getMessage());
  console.log(smnBody.getSubject());
}
```
