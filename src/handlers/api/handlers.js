const AWS = require('aws-sdk');
const debug = require("debug");
const errors = require('./errors');
const StoreModel = require('../../dao/models').StoreModel;
const StatusCodes = require("http-status-codes").StatusCodes;
const uploader = require('../../libraries/uploader/uploader');
const amqpClient = require('../../libraries/amqp/client');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// TODO
// - how export and organize constant list inside the module.

/**
 * Handles POST /store/images endpoint.
 * @param req
 * @param res
 * @returns {*|boolean|void}
 */
const uploadImageHandler = async (req, res, next) => {
  try {
    const item = await StoreModel.create({
      original: req.file.filename,
      type: req.file.mimetype,
      size: req.file.size,
      status: 1,
    });

    await amqpClient.sendToQueue({
      id: item.id,
      action: "resize"
    });

    return res.status(StatusCodes.OK).send(item);
  } catch (e) {
    next(e);
  }
};

/**
 * Handles GET /store/images/:id endpoint.
 * @param req
 * @param res
 * @param next
 * @returns {*|boolean|void}
 */
const getImageHandler = async(req, res, next) => {
  const item = await StoreModel.findByPk(req.params.id);
  if (!item) {
    return res.status(StatusCodes.NOT_FOUND).send();
  }

  return res.status(StatusCodes.OK).send(item);
};

/**
 * Handles GET /store/images endpoint.
 * @param req
 * @param res
 * @param next
 * @returns {*|boolean|void}
 */
const getImagesHandler = async (req, res, next) => {
  try {
    const log = debug("express:handlers:get-images");
    const items =  await StoreModel.findAll();
    return res.status(StatusCodes.OK).send(items);
  } catch (e) {
    next(e);
  }
};

/**
 * Handles GET /store/images/:id/:type/download endpoint.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const downloadImageHandler = async (req, res, next) => {
  const log = debug("express:handlers:download-image");
  try {
    const item = await StoreModel.findByPk(req.params.id);
    if (!item) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }

    if(!item[req.params.type]) {
      return next(errors.unsupportedImageType);
    }

    const s3Object = await s3.getObject({
      Key: item[req.params.type],
      Bucket: process.env.AWS_S3_BUCKET
    }).promise();

    return res.status(StatusCodes.OK).send(s3Object.Body);
  } catch (e) {
    next(e);
  }
}

/**
 * Handles DELETE /store/images/:id endpoint.
 * @param req
 * @param res
 * @param next
 * @returns {*|boolean|void}
 */
const deleteImageHandler = async (req, res, next) => {
  const log = debug("express:handlers:delete-image");
  try {
    const item = await StoreModel.findByPk(req.params.id);
    if (!item) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }

    await amqpClient.sendToQueue({
      id: item.id,
      action: "delete"
    });

    await item.destroy();

    return res.status(StatusCodes.OK).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  uploadImageHandler: [uploader.single("image"), uploadImageHandler],
  getImageHandler,
  getImagesHandler,
  downloadImageHandler,
  deleteImageHandler
};
