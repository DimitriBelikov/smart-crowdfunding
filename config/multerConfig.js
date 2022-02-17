const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

//Storage Configuration for campaign documents
const campaignStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join('./campaign documents', req.body.campaignId);
        //const dir = `./campaign documents/${req.body.campaignId}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.mkdirSync(path.join(dir, 'documents'));
        }
        cb(null, path.join(dir, 'documents'));
    },
    filename: function (req, file, cb) {
        if (file.fieldname == 'campaignCoverMedia')
            cb(null, file.fieldname + path.extname(file.originalname))
        else
            cb(null, file.originalname)
    }
});
exports.campaignUpload = multer({ storage: campaignStorage });

//Configuration for request documents
const requestStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join('./campaign documents', req.params.id, 'requests');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.mkdirSync(path.join(dir, req.body.requestNumber));
        }
        cb(null, path.join(dir, req.body.requestNumber));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
exports.requestUpload = multer({ storage: requestStorage });