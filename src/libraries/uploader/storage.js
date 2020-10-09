const crypto = require('crypto')
const AWS = require('aws-sdk');

// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

function getDestination (req, file, cb) {
  cb(null, '/dev/null');
}

function getFilename (req, file, cb) {
  crypto.pseudoRandomBytes(16, function (err, raw) {
    cb(err, err ? undefined : raw.toString('hex'));
  })
}

function S3Storage (opts) {
  this.getFilename = (opts.filename || getFilename);
  this.getDestination = (opts.destination || getDestination);
}

S3Storage.prototype._handleFile = function _handleFile (req, file, cb) {
  const that = this
  that.getDestination(req, file, function (err, destination) {
    if (err) return cb(err)

    that.getFilename(req, file, function (err, filename) {
      if (err) return cb(err)

      let fileSize = 0;
      file.stream.on("data", chunk => {
        fileSize += chunk.length;
      })
      s3.upload ({
        Key: filename,
        Bucket: destination,
        Body: file.stream
      }, function (error, data) {
        if(error) {
          cb(error);
        } else {
          cb(null, {
            destination: data.Bucket,
            filename: data.Key,
            path: data.Location,
            size: fileSize,
          })
        }
      });
    });
  })
}

S3Storage.prototype._removeFile = function _removeFile (req, file, cb) {}

module.exports = function (opts) {
  return new S3Storage(opts)
}


