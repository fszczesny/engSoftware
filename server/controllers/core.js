'use strict';

var AWS = require('aws-sdk');
var uuid = require('uuid/v1');

exports.uploadFile = function(req, res) { 
    var s3 = new AWS.S3();
    var bucketName = 'eng-software-property-imgs-eb4b5ce6-6301-11e8-adc0-fa7ae01bbebc';

    var extension = req.body.extension;
    var fileBase64 = req.body.base64;
    fileBase64 = fileBase64.split(',')[1];
    var fileData = Buffer.from(fileBase64, 'base64');
    var fileName = 'file-' + uuid() + extension;
   
    var endpoint = s3.endpoint.hostname;
    var fileURL = "https://" + bucketName + "." + endpoint + "/" + fileName;

    var params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileData,
        ACL: 'public-read',
    };
    s3.upload(params, function(err, data) {
        if (err) throw err;
        res.json({ url: fileURL });
    });
};

exports.deleteFile = function(req, res) {
    var s3 = new AWS.S3();
    var bucketName = 'eng-software-property-imgs-eb4b5ce6-6301-11e8-adc0-fa7ae01bbebc';
    var fileKey = req.params.fileKey;

    var params = {
        Bucket: bucketName, 
        Key: fileKey
    };
    s3.deleteObject(params, function(err, data) {
        if (err) throw err;
        res.json(data);
    });
}