"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
var sharp = require('sharp');
var appfunctions_1 = __importDefault(require("../appfunctions"));
var photoDir = __dirname + '/photos/';
var fullDir = photoDir + 'full/';
var thumbDir = photoDir + 'thumb/';
// const request = supertestserver();
// describe('Test endpoint responses', () => {
//     it('gets the api endpoint', async (done) => {
//         const response = await request.get('/api');
//         expect(response.status).toBe(200);
//         done();
//     });
// });
describe("query string", function () {
    it("should check the error array is empty", function () {
        var errors = [];
        index_1.default.testFileName('fjord', errors);
        expect(errors.length).toEqual(0);
    });
    it("should check the error array has an error ", function () {
        var errors = [];
        index_1.default.testFileName('', errors);
        expect(errors.length).toEqual(1);
    });
});
describe("height and width errors", function () {
    it("should check the error array for height and width is empty", function () {
        var errors = [];
        index_1.default.testQueryStringNumber('200', 'message-here', errors);
        expect(errors.length).toEqual(0);
    });
    it("should check the error array for height and width has an error", function () {
        var errors = [];
        index_1.default.testQueryStringNumber('', 'message-here', errors);
        expect(errors.length).toEqual(1);
    });
});
describe("checks the image folder", function () {
    it("checks the error array for no file present", function () {
        var errors = [];
        var fileName = " ";
        index_1.default.checkIfTheFileAlreadyExists(fullDir, fileName, errors);
        expect(errors.length).toEqual(1);
    });
    it("checks if the file is in the folder", function () {
        var errors = [];
        var fileName = "fjord";
        index_1.default.checkIfTheFileAlreadyExists(fullDir, fileName, errors);
        expect(fileName).toBeTruthy();
    });
});
describe("image processing", function () {
    it("makes a thumb image", function () {
        sharp(fullDir + 'fjord.jpeg')
            .resize((300), (200))
            .toFile(thumbDir + 'testresult.jpeg', function (err, info) {
            expect(err).toBeNull();
        });
    });
    it("throws an error if there is not an image in the full folder", function () {
        sharp(fullDir + 'icelandwaterfall.jpeg')
            .resize((205), (200))
            .toFile(thumbDir + 'testresult.jpeg', function (err, info) {
            expect(err).toThrowError();
        });
    });
});
it("tests the hello world", function () {
    expect(appfunctions_1.default()).toEqual("Hello World");
});
