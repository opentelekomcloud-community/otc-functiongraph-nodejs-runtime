class CTSEvent {
  constructor(event) {
    this._event = event.cts || {};
  }

  getAPIVersion() {
    return this._event.api_version || "";
  }

  getCode() {
    return this._event.code || "";
  }  

  getDomainId() {
    return this._event.domain_id || "";
  }

  getMessage() {
    return this._event.message || "";
  }

  getOperationId() {  
    return this._event.operation_id || "";
  }

  getProjectId() {
    return this._event.project_id || "";
  }

  getReadOnly() {
    return this._event.read_only || false;
  }

  getRecordTime() {
    return this._event.record_time || "";
  }

  getRequest() {
    return this._event.request || {};
  }

  getResourceAccountId() {
    return this._event.resource_account_id || "";  
  }

  getResourceID() {
    return this._event.resource_id || "";  
  }

  getResourceName() {
    return this._event.resource_name || "";
  }

  getResourceType() {
    return this._event.resource_type || "";
  }

  getResponse() {
    return this._event.response || {};
  }

  getServiceType() {
    return this._event.service_type || "";
  }
  getSourceIP() {
    return this._event.source_ip || "";
  }

  getTime() {
    return this._event.time || "";
  }

  getTraceId() {
    return this._event.trace_id || "";
  }

  getTraceName() {
    return this._event.trace_name || "";
  } 

  getTraceRating() {
    return this._event.trace_rating || "";
  } 

  getTraceStatus() {
    return this._event.trace_status || "";
  }

  getTraceType() {
    return this._event.trace_type || "";
  }

  getUser() {
      return new CTSUser(this._event.user);
    }

}

class CTSUser{
  constructor(user) {
    this._user = user || {};
  }

  getId() {
    return this._user.id || "";
  }
  getName() {
    return this._user.name || "";
  }

  getDomain() {
    return new CTSUserDomain(this._user.domain);
  }

}

class CTSUserDomain{
  constructor(userDomain) {
    this._userDomain = userDomain || {};
  }

  getId() {
    return this._userDomain.id || "";
  }
  getName() {
    return this._userDomain.name || "";
  }

}

module.exports = {
  CTSEvent,
  CTSUser,
  CTSUserDomain
};