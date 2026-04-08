/**
 * TypeScript Test for SMN Event Classes
 * Tests the SMN event types and classes with test data
 */

import type { SMNEvent as SMNEventType, SMNEventData, SMNRecordData, SMNBodyData } from '../src/smnevent';
import * as smnEventData from '../resources/smnevent.json';

// Import the actual JavaScript module (compiled code will be in dist/test/, so we need ../../)
const { SMNEvent, SMNRecord, SMNBody } = require('../../src/smnevent');

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
 * Test suite for SMN Event
 */
class SMNEventTest {
  private event: SMNEventType;
  private testData: SMNEventData;

  constructor() {
    this.testData = smnEventData as SMNEventData;
    this.event = new SMNEvent(this.testData);
  }

  /**
   * Test SMNEvent main properties
   */
  testEventProperties(): void {
    console.log('\n=== Testing SMNEvent Properties ===');

    const functionName = this.event.getFunctionName();
    assert(functionName === 'test', `Function name should be 'test', got: ${functionName}`);

    const requestId = this.event.getRequestId();
    assert(requestId === '7c307f6a-cf68-4e65-8be0-4c77405a1b2c',
      `Request ID should match, got: ${requestId}`);

    const timestamp = this.event.getTimestamp();
    assert(timestamp === 'Tue Jan 09 2018 15:11:40 GMT+0800 (CST)',
      `Timestamp should match, got: ${timestamp}`);

    console.log(`  Function Name: ${functionName}`);
    console.log(`  Request ID: ${requestId}`);
    console.log(`  Timestamp: ${timestamp}`);
  }

  /**
   * Test SMNEvent records
   */
  testEventRecords(): void {
    console.log('\n=== Testing SMNEvent Records ===');

    const records = this.event.getRecords();
    assert(Array.isArray(records), 'Records should be an array');
    assert(records.length === 2, `Should have 2 records, got: ${records.length}`);

    console.log(`  Number of records: ${records.length}`);
  }

  /**
   * Test SMNRecord properties
   */
  testRecordProperties(): void {
    console.log('\n=== Testing SMNRecord Properties ===');

    const records = this.event.getRecords();
    const firstRecord = records[0];

    const eventSubscriptionUrn = firstRecord.getEventSubscriptionUrn();
    assert(eventSubscriptionUrn === 'functionUrn',
      `Event subscription URN should be 'functionUrn', got: ${eventSubscriptionUrn}`);

    const eventSource = firstRecord.getEventSource();
    assert(eventSource === 'smn', `Event source should be 'smn', got: ${eventSource}`);

    console.log(`  Event Subscription URN: ${eventSubscriptionUrn}`);
    console.log(`  Event Source: ${eventSource}`);
  }

  /**
   * Test SMNBody properties
   */
  testSMNBodyProperties(): void {
    console.log('\n=== Testing SMNBody Properties ===');

    const records = this.event.getRecords();
    const smnBody = records[0].getSMNBody();

    const topicUrn = smnBody.getTopicUrn();
    assert(topicUrn === 'topicUrn', `Topic URN should be 'topicUrn', got: ${topicUrn}`);

    const timestamp = smnBody.getTimestamp();
    assert(timestamp === '2018-01-09T07:11:40Z',
      `Timestamp should be '2018-01-09T07:11:40Z', got: ${timestamp}`);

    const message = smnBody.getMessage();
    assert(message === 'this is smn message content',
      `Message should match, got: ${message}`);

    const messageId = smnBody.getMessageId();
    assert(messageId === 'a51671f77d4a479cacb09e2cd591a983',
      `Message ID should match, got: ${messageId}`);

    const subject = smnBody.getSubject();
    assert(subject === 'this is smn message subject',
      `Subject should match, got: ${subject}`);

    const type = smnBody.getType();
    assert(type === 'notification', `Type should be 'notification', got: ${type}`);

    const messageAttributes = smnBody.getMessageAttributes();
    assert(messageAttributes === null,
      `Message attributes should be null, got: ${messageAttributes}`);

    console.log(`  Topic URN: ${topicUrn}`);
    console.log(`  Timestamp: ${timestamp}`);
    console.log(`  Message: ${message}`);
    console.log(`  Message ID: ${messageId}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Type: ${type}`);
    console.log(`  Message Attributes: ${messageAttributes}`);
  }

  /**
   * Test JSON serialization
   */
  testJSONSerialization(): void {
    console.log('\n=== Testing JSON Serialization ===');

    const json = this.event.toJSON();
    assert(typeof json === 'object', 'toJSON should return an object');
    assert(json.functionname === 'test', 'Serialized data should preserve function name');
    assert(Array.isArray(json.record), 'Serialized data should have record array');

    console.log(`  Serialized event: ${JSON.stringify(json, null, 2)}`);
  }

  /**
   * Test type safety with TypeScript interfaces
   */
  testTypeSafety(): void {
    console.log('\n=== Testing Type Safety ===');

    // Test that the data conforms to SMNEventData interface
    const typedData: SMNEventData = this.testData;
    assert(typedData.record !== undefined, 'Typed data should have record property');
    assert(typedData.functionname !== undefined, 'Typed data should have functionname property');

    // Test individual record typing
    const record: SMNRecordData = typedData.record[0];
    assert(record.event_version === '1.0', 'Record should have event_version');
    assert(record.smn !== undefined, 'Record should have smn property');

    // Test SMNBody typing
    const smnBody: SMNBodyData = record.smn;
    assert(smnBody.topic_urn === 'topicUrn', 'SMNBody should have topic_urn');
    assert(smnBody.message_id !== undefined, 'SMNBody should have message_id');

    console.log('  ✓ All type assertions passed');
  }

  /**
   * Test all records
   */
  testAllRecords(): void {
    console.log('\n=== Testing All Records ===');

    const records = this.event.getRecords();

    records.forEach((record: any, index: number) => {
      console.log(`\n  Record ${index + 1}:`);
      console.log(`    Event Source: ${record.getEventSource()}`);
      console.log(`    Event Subscription URN: ${record.getEventSubscriptionUrn()}`);

      const smnBody = record.getSMNBody();
      console.log(`    Message ID: ${smnBody.getMessageId()}`);
      console.log(`    Subject: ${smnBody.getSubject()}`);
      console.log(`    Message: ${smnBody.getMessage()}`);
    });
  }

  /**
   * Run all tests
   */
  runAllTests(): void {
    console.log('╔═══════════════════════════════════════╗');
    console.log('║  SMN Event TypeScript Test Suite     ║');
    console.log('╚═══════════════════════════════════════╝');

    try {
      this.testEventProperties();
      this.testEventRecords();
      this.testRecordProperties();
      this.testSMNBodyProperties();
      this.testJSONSerialization();
      this.testTypeSafety();
      this.testAllRecords();

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
const testSuite = new SMNEventTest();
testSuite.runAllTests();
