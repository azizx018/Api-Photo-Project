"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var fs_2 = require("fs");
var app = express_1.default();
var port = 3000;
var sharp = require('sharp');
var photoDir = __dirname + '/photos/';
var fullDir = photoDir + 'full/';
var thumbDir = photoDir + 'thumb/';
//check query string for filename
function testFileName(fileName, errors) {
    if (fileName === undefined || fileName === null || Object.keys(fileName).length === 0) {
        var message = "filename needed in query string";
        console.log(message);
        errors.push(message);
    }
    else {
        console.log("the filename entered is " + fileName);
    }
}
//check that a width/height was entered as a number
function testQueryStringNumber(str, input, errors) {
    if (str === undefined || str === null || Object.keys(str).length === 0
        || Object.is(NaN, parseInt(str.toString()))) {
        var message = "A valid " + input + " is needed in query string";
        console.log(message);
        errors.push(message);
    }
    else {
        console.log("the " + input + " entered is " + str);
    }
}
//check if the file exists-- assuming all files are jpeg
function checkIfTheFileAlreadyExists(fullDir, fileName, errors) {
    if (fs_2.existsSync("" + fullDir + fileName + ".jpeg")) {
        console.log("Your file exists");
    }
    else {
        var message = "The file does not exist";
        console.log(message);
        errors.push(message);
    }
}
app.use(express_1.default.static(thumbDir));
app.get('/api', function (req, res) {
    var errors = [];
    var fileName = req.query.filename || '';
    testFileName(fileName.toString(), errors);
    var height = req.query.height || '';
    var width = req.query.width || '';
    testQueryStringNumber(width.toString(), 'width', errors);
    testQueryStringNumber(height.toString(), 'height', errors);
    checkIfTheFileAlreadyExists(fullDir, fileName.toString(), errors);
    //this checks the error array and the thumb and creates an image if is doesn't exist
    function checkErrorsAndMakeThumb() {
        if (errors.length > 0) {
            res.send(errors);
        }
        else {
            //see if the thumbnail doesn't exist then run sharp
            var thumbFileName_1 = fileName + "_" + width + "x" + height + ".jpeg";
            var thumbFilePath = "" + thumbDir + thumbFileName_1;
            var thumbExists = fs_1.default.existsSync(thumbFilePath);
            if (!thumbExists) {
                console.log("Hey I'm misssing!");
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
    }
    checkErrorsAndMakeThumb();
});
app.listen(port, function () {
    console.log("server is working on local host" + port);
});
exports.default = {
    testFileName: testFileName,
    testQueryStringNumber: testQueryStringNumber,
    checkIfTheFileAlreadyExists: checkIfTheFileAlreadyExists
};
