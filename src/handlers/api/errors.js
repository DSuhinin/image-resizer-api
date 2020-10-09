const HttpError = require("../../errors/http");
const StatusCodes = require("http-status-codes").StatusCodes;

const invalidImageType = new HttpError(
  StatusCodes.BAD_REQUEST,
  20000,
  "allowed to upload only .png, .jpg, .jpeg and .gif extensions"
);
const unsupportedImageType = new HttpError(
  StatusCodes.BAD_REQUEST,
  20010,
  "unsupported image type. could be `original` or `thumb`"
);

module.exports = {
  invalidImageType,
  unsupportedImageType,
};
