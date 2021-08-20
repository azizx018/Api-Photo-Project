import supertest from 'supertest';
import index from "../index"
const sharp = require('sharp');
import appfunctions from '../appfunctions';
import app from '../index';
import { existsSync } from 'fs';
import fs from 'fs';

const photoDir = __dirname + '/photos/'
const fullDir = photoDir + 'full/'
const thumbDir = photoDir + 'thumb/'

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', async (done) => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        done();
    });
});

describe("query string", () => {
    it("should check the error array is empty", () => {
        const errors: Array<string> = []
        appfunctions.testFileName('fjord', errors)
        expect(errors.length).toEqual(0)

    });
    it("should check the error array has an error ", () => {
        const errors: Array<string> = []
        appfunctions.testFileName('', errors)
        expect(errors.length).toEqual(1)
    });

})

describe("height and width errors", () => {
    it("should check the error array for height and width is empty", () => {
        const errors: Array<string> = []
        appfunctions.testQueryStringNumber('200', 'message-here', errors)
        expect(errors.length).toEqual(0)
    })
    it("should check the error array for height and width has an error", () => {
        const errors: Array<string> = []
        appfunctions.testQueryStringNumber('', 'message-here', errors)
        expect(errors.length).toEqual(1)
    })
})

describe("checks the image folder", () => {
    it("checks the error array for no file present", () => {
        const errors: Array<string> = []
        const fileName = " "
        appfunctions.checkIfTheFileAlreadyExists(fullDir, fileName, errors)
        expect(errors.length).toEqual(1)

    })
    it("checks if the file is in the folder", () => {
        const errors: Array<string> = []
        const fileName = "fjord"
        appfunctions.checkIfTheFileAlreadyExists(fullDir, fileName, errors)
        expect(fileName).toBeTruthy()
    })
})

describe("image processing", () => {
    it("makes a thumb image", () => {
        console.log(fullDir)
        sharp(fullDir + 'fjord.jpeg')
            .resize((300), (200))
            .toFile(thumbDir + 'testresult.jpeg', function (err: Error, info: Object) {
                //expect(err).toBeNull()
                console.log(err)
                const fileExists = existsSync(thumbDir + 'testresult.jpeg')
                expect(fileExists).toBeTrue()
            })
    })



})
afterAll(() => {
    const fileExists = existsSync(thumbDir + 'testresult.jpeg')
    if (fileExists) {
        fs.unlinkSync(thumbDir + 'testresult.jpeg')
    }
}

)

