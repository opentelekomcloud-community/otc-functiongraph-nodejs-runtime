/**
 * TypeScript definitions for APIG Event
 * API Gateway trigger event for FunctionGraph
 */

export interface APIGRequestContextJSON {
  apiId?: string;
  requestId?: string;
  stage?: string;
}

export interface APIGEventJSON {
  body?: string;
  isBase64Encoded?: boolean;
  requestContext?: APIGRequestContextJSON;
  queryStringParameters?: Record<string, unknown>;
  httpMethod?: string;
  pathParameters?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  path?: string;
}

export interface APIGResponseJSON {
  statusCode?: number;
  body?: string;
  headers?: Record<string, unknown>;
  isBase64Encoded?: boolean;
}

export declare class APIGEvent {
  constructor(event?: APIGEventJSON);

  /** Get request body decoded to plain text */
  getBody(): string;

  /** Get raw request body */
  getRawBody(): string;

  /** Get request context wrapper */
  getRequestContext(): APIGRequestContext;

  /** Get request context value by key (case-insensitive fallback) */
  getRequestContextValue(key: string): string;

  /** Get query string parameters */
  getQueryStringParameters(): Record<string, unknown>;

  /** Get a single query string parameter by name (case-insensitive fallback) */
  getQueryStringParameter(paramName: string): string;

  /** Get HTTP method */
  getHTTPMethod(): string;

  /** Get path parameters */
  getPathParameters(): Record<string, unknown>;

  /** Get a single path parameter by name (case-insensitive fallback) */
  getPathParameter(paramName: string): string;

  /** Get request headers */
  getHeaders(): Record<string, unknown>;

  /** Get a single header by name (case-insensitive fallback) */
  getHeader(headerName: string): string;

  /** Get request path */
  getPath(): string;

  /** Whether incoming body is base64-encoded */
  isBase64Encoded(): boolean | undefined;

  /** Convert event back to JSON */
  toJSON(): APIGEventJSON;
}

export declare class APIGRequestContext {
  constructor(requestContext?: APIGRequestContextJSON);

  /** Get API ID */
  getAPIId(): string;

  /** Get request ID */
  getRequestId(): string;

  /** Get stage */
  getStage(): string;

  /** Convert context back to JSON */
  toJSON(): APIGRequestContextJSON;
}

export declare class APIGResponse {
  statusCode: number;
  body: string;
  headers: Record<string, unknown>;
  isBase64Encoded: boolean;

  constructor(
    statusCode?: number,
    body?: string,
    headers?: Record<string, unknown>,
    isBase64Encoded?: boolean,
  );

  /** Create response instance from JSON */
  static fromJSON(json: APIGResponseJSON): APIGResponse;

  /** Set status code */
  setStatusCode(statusCode: number): void;

  /** Set response body, optionally base64-encoding it */
  setBody(body: string | Record<string, unknown>, isBase64Encoded?: boolean): void;

  /** Get raw body string */
  getRawBody(): string;

  /** Get decoded body string */
  getBody(): string;

  /** Parse decoded body as JSON */
  getBodyParsed(): unknown;

  /** Convert response to JSON */
  toJSON(): APIGResponseJSON;
}
