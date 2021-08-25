import supertest from 'supertest';
const sharp = require('sharp');
import appfunctions from '../appfunctions';
import app from '../index';
import { existsSync } from 'fs';
import fs from 'fs';
import utilities from '../utilities';

const photoDir: string = __dirname + '/photos/';
const fullDir: string = photoDir + 'full/';
const thumbDir: string = photoDir + 'thumb/';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets the api endpoint', async (done) => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    done();
  });
});

describe('query string', () => {
  it('should check the error array is empty', () => {
    const errors: Array<string> = [];
    appfunctions.testFileName('fjord', errors);
    expect(errors.length).toEqual(0);
  });
  it('should check the error array has an error ', () => {
    const errors: Array<string> = [];
    appfunctions.testFileName('', errors);
    expect(errors.length).toEqual(1);
  });
});

describe('height and width errors', () => {
  it('should check the error array for height and width is empty', () => {
    const errors: Array<string> = [];
    appfunctions.testQueryStringNumber('200', 'message-here', errors);
    expect(errors.length).toEqual(0);
  });
  it('should check the error array for height and width has an error', () => {
    const errors: Array<string> = [];
    appfunctions.testQueryStringNumber('', 'message-here', errors);
    expect(errors.length).toEqual(1);
  });
});

describe('checks the image folder', () => {
  it('checks the error array for no file present', () => {
    const errors: Array<string> = [];
    const fileName: string = ' ';
    appfunctions.checkIfTheFileAlreadyExists(fullDir, fileName, errors);
    expect(errors.length).toEqual(1);
  });
  it('checks if the file is in the folder', () => {
    const errors: Array<string> = [];
    const fileName: string = 'fjord';
    appfunctions.checkIfTheFileAlreadyExists(fullDir, fileName, errors);
    expect(fileName).toBeTruthy();
  });
});

describe('image processing', () => {
  it('makes a thumb image', () => {
    const fileName: string = 'fjord';
    const width: string = '200';
    const height: string = '200';
    const thumbFileName: string = `${fileName}_${width}x${height}.jpeg`;
    const thumbFilePath: string = `${thumbDir}${thumbFileName}`;
    utilities.createImage(fileName, width, height, thumbFilePath);
    expect(thumbFileName).toEqual('fjord_200x200.jpeg')
  });
});
afterAll(() => {
  const fileExists: boolean = existsSync(thumbDir + 'testresult.jpeg');
  if (fileExists) {
    fs.unlinkSync(thumbDir + 'testresult.jpeg');
  }
});
