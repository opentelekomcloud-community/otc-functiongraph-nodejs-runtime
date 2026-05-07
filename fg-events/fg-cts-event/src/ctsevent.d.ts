/**
 * TypeScript definitions for CTS Event
 * CTS trigger event for FunctionGraph
 */

export interface CTSBaseUserDomainJSON {
  id?: string;
  name?: string;
}

export interface CTSSessionContextAttributesJSON {
  created_at?: string;
  mfa_authenticated?: boolean | string;
}

export interface CTSSessionContextJSON {
  attributes?: CTSSessionContextAttributesJSON;
}

export interface CTSUserInfoJSON {
  type?: string;
  principal_id?: string;
  principal_urn?: string;
  account_id?: string;
  access_key_id?: string;
  id?: string;
  name?: string;
  domain?: CTSBaseUserDomainJSON;
  user_name?: string;
  principal_is_root_user?: boolean | string;
  invoked_by?: string[];
  session_context?: CTSSessionContextJSON;
  OriginUser?: string;
}

export interface CTSEventDataJSON {
  time?: number;
  user?: CTSUserInfoJSON;
  request?: Record<string, unknown>;
  response?: Record<string, unknown>;
  service_type?: string;
  event_type?: string;
  project_id?: string;
  resource_type?: string;
  resource_account_id?: string;
  read_only?: boolean;
  tracker_name?: string;
  operation_id?: string;
  resource_name?: string;
  resource_id?: string;
  source_ip?: string;
  domain_id?: string;
  trace_name?: string;
  trace_status?: string;
  trace_rating?: string;
  trace_type?: string;
  api_version?: string;
  message?: string;
  record_time?: string;
  trace_id?: string;
  code?: string;
  request_id?: string;
  location_info?: Record<string, unknown>;
  endpoint?: string;
  resource_url?: string;
  enterprise_project_id?: string;
  user_agent?: string;
  content_length?: number;
  total_time?: number;
}

export interface CTSEventJSON {
  cts?: CTSEventDataJSON;
}

export declare class CTSEvent {
  constructor(event?: CTSEventJSON);

  getTime(): number;
  getUser(): CTSUserInfo;
  getRequest(): Record<string, unknown>;
  getResponse(): Record<string, unknown>;
  getServiceType(): string;
  getEventType(): string;
  getProjectId(): string;
  getResourceType(): string;
  getResourceAccountId(): string;
  getReadOnly(): boolean;
  getTrackerName(): string;
  getOperationId(): string;
  getResourceName(): string;
  getResourceId(): string;
  getSourceIP(): string;
  getDomainId(): string;
  getTraceName(): string;
  getTraceStatus(): string;
  getTraceRating(): string;
  getTraceType(): string;
  getAPIVersion(): string;
  getMessage(): string;
  getRecordTime(): string;
  getTraceId(): string;
  getCode(): string;
  getRequestId(): string;
  getLocationInfo(): Record<string, unknown>;
  getEndpoint(): string;
  getResourceURL(): string;
  getEnterpriseProjectId(): string;
  getUserAgent(): string;
  getContentLength(): number;
  getTotalTime(): number;
  toJSON(): CTSEventDataJSON;
}

export declare class CTSBaseUserDomain {
  constructor(userDomain?: CTSBaseUserDomainJSON);

  getId(): string;
  getName(): string;
  toJSON(): CTSBaseUserDomainJSON;
}

export declare class CTSSessionContext {
  constructor(sessionContext?: CTSSessionContextJSON);

  getAttributes(): CTSSessionContextAttributes;
  toJSON(): CTSSessionContextJSON;
}

export declare class CTSSessionContextAttributes {
  constructor(sessionAttributes?: CTSSessionContextAttributesJSON);

  getCreatedAt(): string;
  get MFAAuthenticated(): boolean | string;
  toJSON(): CTSSessionContextAttributesJSON;
}

export declare class CTSUserInfo {
  constructor(user?: CTSUserInfoJSON);

  getType(): string;
  getPrincipalId(): string;
  getPrincipalURN(): string;
  getAccountId(): string;
  getAccessKeyId(): string;
  getId(): string;
  getName(): string;
  getDomain(): CTSBaseUserDomain;
  getUserName(): string;
  getPrincipalIsRootUser(): boolean | string;
  getInvokedBy(): string[];
  getSessionContext(): CTSSessionContext;
  getOriginUser(): string;
  toJSON(): CTSUserInfoJSON;
}
