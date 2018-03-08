const keys = require('../config/keys');

const AWS = require('aws-sdk');
const _ = require('lodash');
const q = require('q');

let service = {};

const AWS_ACCESS_KEY_ID = keys.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = keys.AWS_SECRET_ACCESS_KEY;
const AWS_BUCKET_NAME = keys.AWS_BUCKET_NAME;
const AWS_BUCKET_PATH = keys.AWS_BUCKET_PATH;

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

let s3 = new AWS.S3();

function write (path, file) {
    let deffered = q.defer();

    s3.putObject({
        Bucket: AWS_BUCKET_NAME,
        Key: AWS_BUCKET_PATH + '/' + path,
        Body: file
    }, function (err, data) {
        deffered.resolve(data || err);
    });

    return deffered.promise;
}

function readFile (path) {
    let deffered = q.defer();

    path = path.replace(AWS_BUCKET_PATH + '/', '');

    s3.getObject({
        Bucket: AWS_BUCKET_NAME,
        Key: AWS_BUCKET_PATH + '/' + path
    }, function (err, data) {
      // console.log('uploadinggg3');
        if (!data) {
            console.log(err);
            deffered.resolve(err);
        } else {

            deffered.resolve(_.extend(data, {
                path: path
            }));
        }
    });
    console.log('uploading...');
    return deffered.promise;
}

function read (path) {
    let deffered = q.defer();

    readFile(path).then(function (data) {
        if (data.Body) {
            let buf = new Buffer(data.Body);
            deffered.resolve(buf.toString());
        } else {
            deffered.resolve(null);
        }
    });

    return deffered.promise;
}

module.exports = {
    write: write,
    read: read,
    readFile: readFile
};
