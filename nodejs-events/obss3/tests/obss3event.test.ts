/**
 * TypeScript Test for OBS S3 Event Classes
 * Tests the OBS S3 event types and classes with test data
 */

import type { 
  OBSS3Event as OBSS3EventType, 
  OBSS3EventData, 
  OBSS3RecordData,
  S3DetailsData,
  S3ObjectData,
  S3BucketData
} from '../obss3event';
import * as obss3EventData from './obss3_event.json';

// Import the actual JavaScript module (compiled code will be in dist/tests/, so we need ../../)
const { 
  OBSS3Event, 
  OBSS3Record, 
  RequestParameters,
  S3Details,
  S3Object,
  S3Bucket,
  OwnerIdentity,
  UserIdentity
} = require('../../obss3event');

/**
 * Simple test assertion helper
 */
function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

/**
 * Test suite for OBS S3 Event
 */
class OBSS3EventTest {
  private event: OBSS3EventType;
  private testData: OBSS3EventData;

  constructor() {
    this.testData = obss3EventData as OBSS3EventData;
    this.event = new OBSS3Event(this.testData);
  }

  /**
   * Test OBSS3Event records
   */
  testEventRecords(): void {
    console.log('\n=== Testing OBSS3Event Records ===');
    
    const records = this.event.getRecords();
    assert(Array.isArray(records), 'Records should be an array');
    assert(records.length === 1, `Should have 1 record, got: ${records.length}`);
    
    console.log(`  Number of records: ${records.length}`);
  }

  /**
   * Test OBSS3Record basic properties
   */
  testRecordBasicProperties(): void {
    console.log('\n=== Testing OBSS3Record Basic Properties ===');
    
    const records = this.event.getRecords();
    const firstRecord = records[0];
    
    const eventVersion = firstRecord.getEventVersion();
    assert(eventVersion === '2.0', `Event version should be '2.0', got: ${eventVersion}`);
    
    const eventTime = firstRecord.getEventTime();
    assert(eventTime === '2018-01-09T07:50:50.028Z', 
           `Event time should match, got: ${eventTime}`);
    
    const awsRegion = firstRecord.getAwsRegion();
    assert(awsRegion === 'region', `AWS region should be 'region', got: ${awsRegion}`);
    
    const eventName = firstRecord.getEventName();
    assert(eventName === 'ObjectCreated:Post', 
           `Event name should be 'ObjectCreated:Post', got: ${eventName}`);
    
    console.log(`  Event Version: ${eventVersion}`);
    console.log(`  Event Time: ${eventTime}`);
    console.log(`  AWS Region: ${awsRegion}`);
    console.log(`  Event Name: ${eventName}`);
  }

  /**
   * Test Request Parameters
   */
  testRequestParameters(): void {
    console.log('\n=== Testing Request Parameters ===');
    
    const records = this.event.getRecords();
    const requestParams = records[0].getRequestParameters();
    
    const sourceIP = requestParams.getSourceIPAddress();
    assert(sourceIP === '103.218.216.125', 
           `Source IP should be '103.218.216.125', got: ${sourceIP}`);
    
    console.log(`  Source IP Address: ${sourceIP}`);
  }

  /**
   * Test User Identity
   */
  testUserIdentity(): void {
    console.log('\n=== Testing User Identity ===');
    
    const records = this.event.getRecords();
    const userIdentity = records[0].getUserIdentity();
    
    const principalId = userIdentity.getPrincipalId();
    assert(principalId === '9bf43789b1ff4b679040f35cc4f0dc05', 
           `Principal ID should match, got: ${principalId}`);
    
    console.log(`  Principal ID: ${principalId}`);
  }

  /**
   * Test S3 Details
   */
  testS3Details(): void {
    console.log('\n=== Testing S3 Details ===');
    
    const records = this.event.getRecords();
    const s3 = records[0].getS3();
    
    const configId = s3.getConfigurationId();
    assert(configId === 'UK1DGFPYUKUZFHNQ00000160CC0B471D101ED30CE24DF4DB', 
           `Configuration ID should match, got: ${configId}`);
    
    console.log(`  Configuration ID: ${configId}`);
  }

  /**
   * Test S3 Object properties
   */
  testS3Object(): void {
    console.log('\n=== Testing S3 Object Properties ===');
    
    const records = this.event.getRecords();
    const s3Object = records[0].getS3().getObject();
    
    const eTag = s3Object.getETag();
    assert(eTag === '9d377b10ce778c4938b3c7e2c63a229a', 
           `ETag should match, got: ${eTag}`);
    
    const sequencer = s3Object.getSequencer();
    assert(sequencer === '00000000160D9E681484D6B4C0000000', 
           `Sequencer should match, got: ${sequencer}`);
    
    const key = s3Object.getKey();
    assert(key === 'job.png', `Key should be 'job.png', got: ${key}`);
    
    const size = s3Object.getSize();
    assert(size === 777835, `Size should be 777835, got: ${size}`);
    
    console.log(`  ETag: ${eTag}`);
    console.log(`  Sequencer: ${sequencer}`);
    console.log(`  Key: ${key}`);
    console.log(`  Size: ${size} bytes`);
  }

  /**
   * Test S3 Bucket properties
   */
  testS3Bucket(): void {
    console.log('\n=== Testing S3 Bucket Properties ===');
    
    const records = this.event.getRecords();
    const bucket = records[0].getS3().getBucket();
    
    const arn = bucket.getArn();
    assert(arn === 'arn:fss:s3:::syj-input2', 
           `ARN should match, got: ${arn}`);
    
    const name = bucket.getName();
    assert(name === 'functionstorage-template', 
           `Bucket name should be 'functionstorage-template', got: ${name}`);
    
    const ownerIdentity = bucket.getOwnerIdentity();
    const ownerPrincipalId = ownerIdentity.getPrincipalId();
    assert(ownerPrincipalId === '0ed1b73473f24134a478962e631651eb', 
           `Owner principal ID should match, got: ${ownerPrincipalId}`);
    
    console.log(`  ARN: ${arn}`);
    console.log(`  Name: ${name}`);
    console.log(`  Owner Principal ID: ${ownerPrincipalId}`);
  }

  /**
   * Test JSON serialization
   */
  testJSONSerialization(): void {
    console.log('\n=== Testing JSON Serialization ===');
    
    const json = this.event.toJSON();
    assert(typeof json === 'object', 'toJSON should return an object');
    assert(Array.isArray(json.Records), 'Serialized data should have Records array');
    assert(json.Records.length === 1, 'Should have 1 record in serialized data');
    
    console.log(`  Serialized successfully with ${json.Records.length} record(s)`);
  }

  /**
   * Test type safety with TypeScript interfaces
   */
  testTypeSafety(): void {
    console.log('\n=== Testing Type Safety ===');
    
    // Test that the data conforms to OBSS3EventData interface
    const typedData: OBSS3EventData = this.testData;
    assert(typedData.Records !== undefined, 'Typed data should have Records property');
    
    // Test individual record typing
    const record: OBSS3RecordData = typedData.Records[0];
    assert(record.eventVersion === '2.0', 'Record should have eventVersion');
    assert(record.s3 !== undefined, 'Record should have s3 property');
    
    // Test S3 details typing
    const s3Details: S3DetailsData = record.s3;
    assert(s3Details.configurationId !== undefined, 'S3 details should have configurationId');
    assert(s3Details.object !== undefined, 'S3 details should have object');
    assert(s3Details.bucket !== undefined, 'S3 details should have bucket');
    
    // Test S3 object typing
    const s3Object: S3ObjectData = s3Details.object;
    assert(s3Object.key === 'job.png', 'S3 object should have key');
    assert(s3Object.size === 777835, 'S3 object should have size');
    
    // Test S3 bucket typing
    const s3Bucket: S3BucketData = s3Details.bucket;
    assert(s3Bucket.name === 'functionstorage-template', 'S3 bucket should have name');
    assert(s3Bucket.ownerIdentity !== undefined, 'S3 bucket should have ownerIdentity');
    
    console.log('  ✓ All type assertions passed');
  }

  /**
   * Test complete record processing
   */
  testCompleteRecordProcessing(): void {
    console.log('\n=== Testing Complete Record Processing ===');
    
    const records = this.event.getRecords();
    
    records.forEach((record: any, index: number) => {
      console.log(`\n  Record ${index + 1}:`);
      console.log(`    Event: ${record.getEventName()}`);
      console.log(`    Time: ${record.getEventTime()}`);
      console.log(`    Region: ${record.getAwsRegion()}`);
      
      const s3 = record.getS3();
      const obj = s3.getObject();
      const bucket = s3.getBucket();
      
      console.log(`    Bucket: ${bucket.getName()}`);
      console.log(`    Object Key: ${obj.getKey()}`);
      console.log(`    Object Size: ${obj.getSize()} bytes`);
      console.log(`    User: ${record.getUserIdentity().getPrincipalId()}`);
    });
  }

  /**
   * Run all tests
   */
  runAllTests(): void {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║  OBS S3 Event TypeScript Test Suite  ║');
    console.log('╚═══════════════════════════════════════╝');
    
    try {
      this.testEventRecords();
      this.testRecordBasicProperties();
      this.testRequestParameters();
      this.testUserIdentity();
      this.testS3Details();
      this.testS3Object();
      this.testS3Bucket();
      this.testJSONSerialization();
      this.testTypeSafety();
      this.testCompleteRecordProcessing();
      
      console.log('\n' + '═'.repeat(40));
      console.log('✅ All tests passed successfully!');
      console.log('═'.repeat(40) + '\n');
    } catch (error) {
      console.error('\n' + '═'.repeat(40));
      console.error('❌ Test failed:');
      console.error(error);
      console.error('═'.repeat(40) + '\n');
      process.exit(1);
    }
  }
}

// Run the tests
const testSuite = new OBSS3EventTest();
testSuite.runAllTests();
