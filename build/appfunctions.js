"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
//check query string for filename
function testFileName(fileName, errors) {
    if (fileName === undefined ||
        fileName === null ||
        Object.keys(fileName).length === 0) {
        var message = 'filename needed in query string';
        console.log(message);
        errors.push(message);
    }
    else {
        console.log("the filename entered is " + fileName);
    }
}
//check that a width/height was entered as a number
function testQueryStringNumber(str, input, errors) {
    if (str === undefined ||
        str === null ||
        Object.keys(str).length === 0 ||
        Object.is(NaN, parseInt(str.toString()))) {
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
    if (fs_1.existsSync("" + fullDir + fileName + ".jpeg")) {
        console.log('Your file exists');
    }
    else {
        var message = 'The file does not exist';
        console.log(message);
        errors.push(message);
    }
}
exports.default = {
    testFileName: testFileName,
    testQueryStringNumber: testQueryStringNumber,
    checkIfTheFileAlreadyExists: checkIfTheFileAlreadyExists,
};
