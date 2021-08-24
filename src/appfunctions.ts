import { existsSync } from 'fs';


//check query string for filename
function testFileName(fileName: String, errors: Array<string>): void {
  if (
    fileName === undefined ||
    fileName === null ||
    Object.keys(fileName).length === 0
  ) {
    const message = 'filename needed in query string';
    console.log(message);
    errors.push(message);
  } else {
    console.log(`the filename entered is ${fileName}`);
  }
}

//check that a width/height was entered as a number
function testQueryStringNumber(
  str: String,
  input: String,
  errors: Array<string>
): void {
  if (
    str === undefined ||
    str === null ||
    Object.keys(str).length === 0 ||
    Object.is(NaN, parseInt(str.toString()))
  ) {
    const message = `A valid ${input} is needed in query string`;
    console.log(message);
    errors.push(message);
  } else {
    console.log(`the ${input} entered is ${str}`);
  }
}

//check if the file exists-- assuming all files are jpeg
function checkIfTheFileAlreadyExists(
  fullDir: String,
  fileName: String,
  errors: Array<string>
): void {
  if (existsSync(`${fullDir}${fileName}.jpeg`)) {
    console.log('Your file exists');
  } else {
    const message = 'The file does not exist';
    console.log(message);
    errors.push(message);
  }
}

export default {
  testFileName,
  testQueryStringNumber,
  checkIfTheFileAlreadyExists,
};
