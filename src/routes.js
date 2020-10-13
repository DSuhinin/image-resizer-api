const express = require("express");
const routes = require("./constants").ROUTE_LIST;

const healthHandlers = require("./handlers/health/handler");
const swaggerHandlers = require("./handlers/swagger/handler");
const storeHandlers = require("./handlers/api/handlers");
const errorHandler = require("./handlers/error/handler");

const router = express.Router();

router.get(routes.ROUTE_GET_HEALTH_INFO, healthHandlers.infoHandler);
router.get(routes.ROUTE_GET_HEALTH_STATUS, healthHandlers.statusHandler);

// image store routes.
router.post(routes.ROUTE_UPLOAD_IMAGE, storeHandlers.uploadImageHandler);
router.get(routes.ROUTE_LIST_IMAGES, storeHandlers.getImagesHandler);
router.get(routes.ROUTE_GET_IMAGE, storeHandlers.getImageHandler);
router.get(routes.ROUTE_DOWNLOAD_IMAGE, storeHandlers.downloadImageHandler);
router.delete(routes.ROUTE_DELETE_IMAGE, storeHandlers.deleteImageHandler);

// swagger swagger routes.
router.use(routes.ROUTE_GET_API_DOCS, swaggerHandlers.docHandler);

// errors routes.
router.use(errorHandler);

module.exports = router;
