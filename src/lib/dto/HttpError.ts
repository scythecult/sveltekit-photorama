import { type StatusCodes } from 'http-status-codes';

/**
 * Custom Error object for errors on HTTP-calls. It is used to separate HTTP errors from others.
 */
export default class HttpError extends Error {
  status?: StatusCodes;
  originalMessage?: string;

  constructor(message?: string, status?: StatusCodes, url?: string, params?: object) {
    const messageParts = [
      ...(status ? [status] : []),
      ...(message ? [message] : []),
      ...(url ? [url] : []),
      ...(params ? [JSON.stringify(params)] : []),
    ];

    super(messageParts.join(', '));
    this.status = status;
    this.originalMessage = message;
  }
}
