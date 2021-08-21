"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var appfunctions_1 = __importDefault(require("./appfunctions"));
var app = express_1.default();
var port = 3000;
var sharp = require('sharp');
var photoDir = __dirname + '/photos/';
var fullDir = photoDir + 'full/';
var thumbDir = photoDir + 'thumb/';
app.use(express_1.default.static(thumbDir));
app.get('/api', function (req, res) {
    var errors = [];
    var fileName = req.query.filename || '';
    appfunctions_1.default.testFileName(fileName.toString(), errors);
    var height = req.query.height || '';
    var width = req.query.width || '';
    appfunctions_1.default.testQueryStringNumber(width.toString(), 'width', errors);
    appfunctions_1.default.checkIfTheFileAlreadyExists(fullDir, fileName.toString(), errors);
    //this checks the error array and the thumb and creates an image if is doesn't exist
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        //see if the thumbnail doesn't exist then run sharp
        var thumbFileName_1 = fileName + "_" + width + "x" + height + ".jpeg";
        var thumbFilePath = "" + thumbDir + thumbFileName_1;
        var thumbExists = fs_1.default.existsSync(thumbFilePath);
        if (!thumbExists) {
            console.log("This photo isn't created yet, but Sharp will make your request!");
            //run the image through sharp and render photo
            sharp(fullDir + fileName + '.jpeg')
                .resize(Number(width), Number(height))
                .toFile(thumbFilePath, function (err, info) {
                if (err === null) {
                    res.send("<img src=\"" + thumbFileName_1 + "\" />");
                }
                else {
                    res.send(err);
                }
            });
        }
        else {
            //image exists ---show image
            res.send("<img src=\"" + thumbFileName_1 + "\" />");
        }
    }
});
app.listen(port, function () {
    console.log("server is working on local host" + port);
});
exports.default = app;
