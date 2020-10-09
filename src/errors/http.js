/**
 * Represent any HTTP errors.
 */
class HttpError extends Error {
  constructor(httpCode, errorCode, message) {
    super(message);
    this.httpCode = httpCode;
    this.errorCode = errorCode;
  }

  toString = () => {
    return JSON.stringify({
      http_code: this.httpCode,
      error_code: this.errorCode,
      message: this.message,
    });
  };
}

module.exports = HttpError;
