const express = require('express');
const router = express.Router();
// middleware for multipart/form-data, primarily used for uploading files - adds a file property on the req object that contains the image file uploaded by the form
const multer = require('multer');
const AWS = require('aws-sdk');
const paramsConfig = require('../utils/params-config');
const params = require('../utils/params-config');

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});

// 'image' is the key
const upload = multer({storage}).single('image');

// locked version number as precaution to reduce code breakage due to API version changes
const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
})

// upload function included as second argument to define the key and storage destination
router.post('/image-upload', upload, (req, res) => {
    console.log("post('/api/image-upload')", req.file);
    const params = paramsConfig(req.file);
    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.json(data);
    });
});

module.exports = router;