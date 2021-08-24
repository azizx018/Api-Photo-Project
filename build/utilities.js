"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sharp = require('sharp');
var photoDir = __dirname + '/photos/';
var fullDir = photoDir + 'full/';
//run the image through sharp
function createImage(fileName, width, height, thumbFilePath) {
    sharp(fullDir + fileName + '.jpeg')
        .resize(Number(width), Number(height))
        .toFile(thumbFilePath, function (err) {
    });
}
exports.default = {
    createImage: createImage
};
