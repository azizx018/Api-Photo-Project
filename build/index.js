"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3000;
var sharp = require('sharp');
var inputPhoto = __dirname + '/photos/full/fjord.jpeg';
var outputPhoto = __dirname + '/photos/thumb/fjord.jpeg';
// fs.exists(inputPhoto, (exist) => {
//     if (exist) {
//         console.log("I got your file")
//     } else {
//         console.log("no file")
//     }
// });
// console.log(__dirname)
app.get('/api', function (req, res) {
    res.send(
        sharp(inputPhoto)
        .resize(200, 200)
        .toFile(outputPhoto, function (err, info) {
        // output.jpg is a 200 pixels wide and 200 pixels high image
        // containing a scaled and cropped version of input.jpge
    }));
});
app.listen(port, function () {
    console.log("server is working on local host" + port);
});
