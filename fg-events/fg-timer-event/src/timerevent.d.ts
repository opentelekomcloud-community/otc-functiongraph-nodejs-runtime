/**
 * TypeScript definitions for Timer Event
 * Timer trigger event for FunctionGraph
 */

/**
 * Complete Timer event structure passed to FunctionGraph
 */
export interface TimerEventData {
  /** Event version */
  version: string;
  /** Event time */
  time: string;
  /** Trigger type */
  trigger_type: string;
  /** Trigger name */
  trigger_name: string;
  /** User event payload (typically a JSON string) */
  user_event: string;
}

/**
 * TimerEvent class for processing timer trigger events
 */
export declare class TimerEvent {
  constructor(event: Partial<TimerEventData>);

  /** Get event version */
  getVersion(): string;

  /** Get event time */
  getTime(): string;

  /** Get trigger type */
  getTriggerType(): string;

  /** Get trigger name */
  getTriggerName(): string;

  /** Get user event */
  getUserEvent(): string;

  /**
   * Get user event parsed as JSON, or undefined if parsing fails
   */
  getUserEventParsed(): Record<string, any> | undefined;

  /** Convert the event back to JSON */
  toJSON(): Partial<TimerEventData>;
}
