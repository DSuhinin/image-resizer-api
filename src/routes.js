const express = require("express");

const healthHandlers = require("./handlers/health/handler");
const swaggerHandlers = require("./handlers/swagger/handler");
const storeHandlers = require("./handlers/api/handlers");
const errorHandler = require("./handlers/error/handler");

const router = express.Router();

// health routes.
router.get("/health/info", healthHandlers.infoHandler);
router.get("/health/status", healthHandlers.statusHandler);

// image store routes.
router.post("/store/images", storeHandlers.uploadImageHandler);
router.get("/store/images", storeHandlers.getImagesHandler);
router.get("/store/images/:id", storeHandlers.getImageHandler);
router.get(
  "/store/images/:id/:type/download",
  storeHandlers.downloadImageHandler
);
router.delete("/store/images/:id", storeHandlers.deleteImageHandler);

// swagger swagger routes.
router.use("/api/docs/", swaggerHandlers.docHandler);

// errors routes.
router.use(errorHandler);

module.exports = router;
