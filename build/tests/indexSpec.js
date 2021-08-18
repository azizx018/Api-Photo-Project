"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
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
it("checks if the file already is loaded in the full folder", function () {
    var photoDir = __dirname + '/photos/';
    var fullDir = photoDir + 'full/';
    var errors = [];
    var fileName = " ";
    index_1.default.checkIfTheFileAlreadyExists(fullDir, fileName, errors);
    expect(errors.length).toEqual(1);
});
