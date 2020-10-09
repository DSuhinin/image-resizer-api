const debug = require("debug");
const statusCodes = require("http-status-codes").StatusCodes;

/**
 * Handles GET /health/status endpoint
 * @param req
 * @param res
 * @returns {*|boolean|void}
 */
const statusHandler = (req, res) => {
  const log = debug("express:handlers:health:status");
  log("in");
  return res.status(statusCodes.OK).send();
};

/**
 * Handles GET /health/info endpoint
 * @param req
 * @param res
 * @returns {*|boolean|void}
 */
const infoHandler = (req, res) => {
  const log = debug("express:handlers:health:info");
  log("in");
  return res.status(statusCodes.OK).send();
};

module.exports = {
  infoHandler,
  statusHandler,
};
