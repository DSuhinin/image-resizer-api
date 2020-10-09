const HttpError = require("../../errors/http");
const StatusCodes = require("http-status-codes").StatusCodes;

const invalidImageType = new HttpError(
  StatusCodes.BAD_REQUEST,
  20000,
  "allowed to upload only .png, .jpg, .jpeg and .gif extensions"
);

module.exports = {
  invalidImageType,
};
