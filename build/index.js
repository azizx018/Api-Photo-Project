"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
;
var app = express_1.default();
var port = 3000;
var sharp = require('sharp');
var photoDir = __dirname + '/photos/';
var fullDir = photoDir + 'full/';
var thumbDir = photoDir + 'thumb/';
app.use('/photos', express_1.default.static(__dirname + '/photos'));
app.get('/api', function (req, res) {
    var errors = [];
    //check for query string that all variables exist
    var fileName = req.query.filename;
    if (fileName === undefined || fileName === null || Object.keys(fileName).length === 0) {
        console.log("filename needed in query string");
        errors.push("filename needed in query string");
    }
    else {
        console.log("the filename entered is " + fileName);
    }
    //check that a width was entered as a number
    //Need to check if this value is numberic
    var width = req.query.width;
    if (width === undefined || width === null || Object.keys(width).length === 0
        || Object.is(NaN, parseInt(width.toString()))) {
        console.log("valid width needed in query string");
        errors.push("valid width needed in query string");
    }
    else {
        console.log("the width entered is " + width);
    }
    //this checks that the height has a value and is a valid number
    var height = req.query.height;
    if (height === undefined || height === null || Object.keys(height).length === 0
        || Object.is(NaN, parseInt(height.toString()))) {
        console.log("valid height needed in query string");
        errors.push("valid height needed in query string");
    }
    else {
        console.log("the width entered is " + height);
    }
    //check if the file exists-- assuming all files are jpeg
    if (fs_1.default.existsSync(fullDir + fileName + '.jpeg')) {
        console.log("The file exists");
    }
    else {
        console.log("file does not exist");
        errors.push("file does not exist");
    }
    //if there are any errors res.send them
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        //see if the thumbnail doesn't exist then run sharp
        var thumbFileName = "" + thumbDir + fileName + "_" + width + "x" + height + ".jpeg";
        console.log(thumbFileName);
        var thumbExists = fs_1.default.existsSync(thumbFileName);
        if (!thumbExists) {
            console.log("Hey I'm misssing!");
            //run the image through sharp
            sharp(fullDir + fileName + '.jpeg')
                .resize(200, 200)
                .toFile(thumbFileName, function (err, info) {
                // output.jpg is a 200 pixels wide and 200 pixels high image
                // containing a scaled and cropped version of input.jpge
            });
        }
        //render photo
        res.send();
    }
});
app.listen(port, function () {
    console.log("server is working on local host" + port);
});
