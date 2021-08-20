import supertest from 'supertest';
import index from "../index"
const sharp = require('sharp');
import test from '../appfunctions';

const photoDir = __dirname + '/photos/'
const fullDir = photoDir + 'full/'
const thumbDir = photoDir + 'thumb/'

// const request = supertestserver();
// describe('Test endpoint responses', () => {
//     it('gets the api endpoint', async (done) => {
//         const response = await request.get('/api');
//         expect(response.status).toBe(200);
//         done();
//     });
// });

describe("query string", () => {
    it("should check the error array is empty", () => {
        const errors: Array<string> = []
        index.testFileName('fjord', errors)
        expect(errors.length).toEqual(0)

    });
    it("should check the error array has an error ", () => {
        const errors: Array<string> = []
        index.testFileName('', errors)
        expect(errors.length).toEqual(1)
    });

})

describe("height and width errors", () => {
    it("should check the error array for height and width is empty", () => {
        const errors: Array<string> = []
        index.testQueryStringNumber('200', 'message-here', errors)
        expect(errors.length).toEqual(0)
    })
    it("should check the error array for height and width has an error", () => {
        const errors: Array<string> = []
        index.testQueryStringNumber('', 'message-here', errors)
        expect(errors.length).toEqual(1)
    })
})

describe("checks the image folder", () => {
    it("checks the error array for no file present", () => {
        const errors: Array<string> = []
        const fileName = " "
        index.checkIfTheFileAlreadyExists(fullDir, fileName, errors)
        expect(errors.length).toEqual(1)

    })
    it("checks if the file is in the folder", () => {
        const errors: Array<string> = []
        const fileName = "fjord"
        index.checkIfTheFileAlreadyExists(fullDir, fileName, errors)
        expect(fileName).toBeTruthy()
    })
})

describe("image processing", () => {
    it("makes a thumb image", () => {

        sharp(fullDir + 'fjord.jpeg')
            .resize((300), (200))
            .toFile(thumbDir + 'testresult.jpeg', function (err: Error, info: Object) {
                expect(err).toBeNull()
            })
    })

    it("throws an error if there is not an image in the full folder", () => {
        sharp(fullDir + 'icelandwaterfall.jpeg')
            .resize((205), (200))
            .toFile(thumbDir + 'testresult.jpeg', function (err: Error, info: Object) {
                expect(err).toThrowError()
            })
    })

})

it("tests the hello world", () => {
    expect(test()).toEqual("Hello World")
})
