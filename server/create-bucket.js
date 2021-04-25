// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// import uuid package to create a unique S3 bucket name
const { v4: uuidv4 } = require('uuid');
// set the region
AWS.config.update({region: 'us-east-2'});

// create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// create the bucketParams objects that assigns the metadata of the bucket (such as the bucket name)
var bucketParams = {
    Bucket : "user-images-" + uuidv4()
};

// call S3 to create the bucket
s3.createBucket(bucketParams, (err, data) => {
    if (err) {
        console.log("error", err);
    } else {
        console.log("success");
    }
});


