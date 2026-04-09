"use strict";
const { CTSUserInfo } = require("./ctsuserinfo");

/**
 * @typedef {Object} CTSBaseUserDomainJSON
 * @property {string} [id]
 * @property {string} [name]
 */

/**
 * @typedef {Object} CTSSessionContextAttributesJSON
 * @property {string} [created_at]
 * @property {boolean | string} [mfa_authenticated]
 */

/**
 * @typedef {Object} CTSSessionContextJSON
 * @property {CTSSessionContextAttributesJSON} [attributes]
 */

/**
 * @typedef {Object} CTSUserInfoJSON
 * @property {string} [type]
 * @property {string} [principal_id]
 * @property {string} [principal_urn]
 * @property {string} [account_id]
 * @property {string} [access_key_id]
 * @property {string} [id]
 * @property {string} [name]
 * @property {CTSBaseUserDomainJSON} [domain]
 * @property {string} [user_name]
 * @property {boolean | string} [principal_is_root_user]
 * @property {string[]} [invoked_by]
 * @property {CTSSessionContextJSON} [session_context]
 * @property {string} [OriginUser]
 */

/**
 * @typedef {Object} CTSEventDataJSON
 * @property {number} [time]
 * @property {CTSUserInfoJSON} [user]
 * @property {Object} [request]
 * @property {Object} [response]
 * @property {string} [service_type]
 * @property {string} [event_type]
 * @property {string} [project_id]
 * @property {string} [resource_type]
 * @property {string} [resource_account_id]
 * @property {boolean} [read_only]
 * @property {string} [tracker_name]
 * @property {string} [operation_id]
 * @property {string} [resource_name]
 * @property {string} [resource_id]
 * @property {string} [source_ip]
 * @property {string} [domain_id]
 * @property {string} [trace_name]
 * @property {string} [trace_status]
 * @property {string} [trace_rating]
 * @property {string} [trace_type]
 * @property {string} [api_version]
 * @property {string} [message]
 * @property {string} [record_time]
 * @property {string} [trace_id]
 * @property {string} [code]
 * @property {string} [request_id]
 * @property {Object} [location_info]
 * @property {string} [endpoint]
 * @property {string} [resource_url]
 * @property {string} [enterprise_project_id]
 * @property {string} [user_agent]
 * @property {number} [content_length]
 * @property {number} [total_time]
 */

/**
 * @typedef {Object} CTSEventJSON
 * @property {CTSEventDataJSON} [cts]
 */

/**
 * CTSEvent Class
 * Represents a CTS event for FunctionGraph
 */
class CTSEvent {
  /**
   * @param {CTSEventJSON} event
   */
  constructor(event) {
    this._event = (event && event.cts) || {};
  }

  /**
   * Timestamp when a trace was generated.
   * The value is the local standard time, for example, 1660927593570.
   * This field is transmitted and stored in the form of a timestamp.
   * It is the total number of milliseconds from 00:00:00, January 1, 1970 to the current time.
   * 
   * Mandatory: yes
   */
  getTime() {
    return this._event.time || 0;
  }

  /**
   * Information of the user who performed the operation that triggered the trace.
   * 
   * Mandatory: yes
   * @returns {CTSUserInfo}
   */
  getUser() {
    return new CTSUserInfo(this._event.user);
  }

  /**
   *
   * Request of an operation on resources.
   */
  getRequest() {
    return this._event.request || {};
  }

  /**
   * Response to a user request, that is, the returned information for an operation on resources.
   */
  getResponse() {
    return this._event.response || {};
  }

  /**
   * Type of a cloud service whose traces are to be queried.
   * 
   * Mandatory: yes
   */
  getServiceType() {
    return this._event.service_type || "";
  }

  /**
   * Event type.
   * 
   * Mandatory: yes
   */
  getEventType() {
    return this._event.event_type || "";
  }

  /**
   * ID of the project to which the trace belongs.
   * 
   * Mandatory: yes
   */
  getProjectId() {
    return this._event.project_id || "";
  }

  /**
   * Type of the resource on which the operation was performed.
   * 
   * Mandatory: yes
   */
  getResourceType() {
    return this._event.resource_type || "";
  }

  /**
   * ID of the account to which the resource belongs.
   * This parameter has a value only when resources are operated across tenants.
   * For example, if tenant A operates resources of tenant B, the value is the
   * account ID of account B.
   * Note: In the cross-tenant scenario, CTS copies an audit log so that both tenants
   * can view the trace on the CTS console.
   */
  getResourceAccountId() {
    return this._event.resource_account_id || "";
  }

  /**
   * Whether a user request is read-only.
   */
  getReadOnly() {
    return this._event.read_only || false;
  }

  /**
   * Name of the tracker that records the trace.
   * - When trace_type is set to system, the default value system is used.
   * - When trace_type is set to data, the value is the name of the corresponding data tracker.
   */
  getTrackerName() {
    return this._event.tracker_name || "";
  }

  /**
   * Operation ID of the trace.
   * 
   * Mandatory: yes
   */
  getOperationId() {
    return this._event.operation_id || "";
  }

  /**
   * Name of a resource on which the recorded operation was performed.
   */
  getResourceName() {
    return this._event.resource_name || "";
  }

  /**
   * ID of a cloud resource on which the recorded operation was performed.
   */
  getResourceId() {
    return this._event.resource_id || "";
  }

  /**
   * IP address of the tenant who performed the operation that triggered the trace.
   * The value of this parameter is empty if the operation is triggered by the system.
   * 
   * Mandatory: yes
   */
  getSourceIP() {
    return this._event.source_ip || "";
  }

  /**
   * ID of the account that triggers the trace.
   * 
   * Mandatory: yes
   */
  getDomainId() {
    return this._event.domain_id || "";
  }

  /**
   * Trace name.
   * 
   * Mandatory: yes
   */
  getTraceName() {
    return this._event.trace_name || "";
  }

  /**
   * Trace status. The value can be normal, warning, or incident.
   * normal: The operation succeeded.
   * warning: The operation failed.
   * incident: The operation caused a serious consequence, for example,
   * a node failure or service interruption.
   * @deprecated This parameter is deprecated. Use getTraceRating() instead.
   */
  getTraceStatus() {
    return this._event.trace_status || "";
  }

  /**
   * Trace status. The value can be normal, warning, or incident.
   * - normal: The operation succeeded.
   * - warning: The operation failed.
   * - incident: The operation caused a serious consequence, for example,
   * a node failure or service interruption.
   * 
   * Mandatory: yes
   */
  getTraceRating() {
    return this._event.trace_rating || "";
  }

  /**
   * Trace source.
   * For management traces, the value can be 
   * - ApiCall,
   * - ConsoleAction, or 
   * - SystemAction.
   * 
   * For data traces, the value can be 
   * - ObsSDK or
   * - ObsAPI.
   * 
   * Mandatory: yes
   */
  getTraceType() {
    return this._event.trace_type || "";
  }

  /**
   * Version of the API called in a trace.
   */
  getAPIVersion() {
    return this._event.api_version || "";
  }

  /**
   * Remarks added by other cloud services to a trace.
   */
  getMessage() {
    return this._event.message || "";
  }

  /**
   * Timestamp when a trace was recorded by CTS.
   * 
   * Mandatory: yes
   */
  getRecordTime() {
    return this._event.record_time || "";
  }

  /**
   * Trace ID. The value is the UUID generated by the system.
   * 
   * Mandatory: yes
   */
  getTraceId() {
    return this._event.trace_id || "";
  }

  /**
   * HTTP status code returned by the associated API.
   */
  getCode() {
    return this._event.code || "";
  }

  /**
   * Request ID.
   */
  getRequestId() {
    return this._event.request_id || "";
  }

  /**
   * Additional information required for fault locating after a request error.
   */
  getLocationInfo() {
    return this._event.location_info || {};
  }

  /**
   * Endpoint in the detail page URL of the cloud resource on
   * which a recorded operation was performed.
   */
  getEndpoint() {
    return this._event.endpoint || "";
  }

  /**
   * Detail page URL (excluding the endpoint) of the cloud resource
   * on which a recorded operation was performed.
   */
  getResourceURL() {
    return this._event.resource_url || "";
  }

  /**
   * ID of the enterprise project to which the resource belongs.
   * 
   * Mandatory: yes
   */
  getEnterpriseProjectId() {
    return this._event.enterprise_project_id || "";
  }

  /**
   * ID of the request client agent.
   */
  getUserAgent() {
    return this._event.user_agent || "";
  }

  /**
   * Length of the request message body.
   */
  getContentLength() {
    return this._event.content_length || 0;
  }

  /**
   * Request response time.
   */
  getTotalTime() {
    return this._event.total_time || 0;
  }

  /**
   * @returns {CTSEventDataJSON}
   */
  toJSON() {
    return this._event;
  }
}

module.exports = { CTSEvent };
