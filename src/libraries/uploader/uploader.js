const path = require("path");
const multer = require("multer");
const md5 = require("md5");
const errors = require("./errors");
const storage = require("./storage");

module.exports = multer({
  storage: storage({
    destination: (req, file, cb) => {
      cb(null, process.env.AWS_S3_BUCKET);
    },
    filename: (req, file, cb) => {
      const fileName =
        md5(file.originalname.toLowerCase() + Date.now()) +
        path.extname(file.originalname);
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
    ];
    if (allowedExtensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      return cb(errors.invalidImageType);
    }
  },
});
