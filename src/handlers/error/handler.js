const debug = require("debug");
const HttpError = require("../../errors/http");
const StatusCodes = require("http-status-codes").StatusCodes;

/**
 * Error handlers catches all service errors and log some data.
 * @param err
 * @param req
 * @param res
 * @returns {*|boolean|void}
 */
const errorHandler = (err, req, res, next) => {
  const log = debug("express:handlers:errors");
  log(`error happened: ${err}`);
  switch (err.constructor) {
    case HttpError:
      return res.status(err.httpCode).send({
        code: err.errorCode,
        message: err.message,
      });
    case SyntaxError:
      return res.status(StatusCodes.BAD_REQUEST).send({
        code: 10001,
        message: "invalid request JSON object.",
      });
    default:
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        code: 10000,
        message: "internal server errors",
      });
  }
};
module.exports = errorHandler;
