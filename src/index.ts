import express from 'express';
import fs from 'fs';
import { existsSync } from 'fs';

const app = express();
const port = 3000;


const sharp = require('sharp');
const photoDir = __dirname + '/photos/'
const fullDir = photoDir + 'full/'
const thumbDir = photoDir + 'thumb/'

//check query string for filename
function testFileName(fileName: String, errors: Array<string>): void {
    if (fileName === undefined || fileName === null || Object.keys(fileName).length === 0) {
        const message = "filename needed in query string"
        console.log(message)
        errors.push(message)
    } else {
        console.log(`the filename entered is ${fileName}`)
    }
}
//check that a width/height was entered as a number
function testQueryStringNumber(str: String, input: String, errors: Array<string>): void {

    if (str === undefined || str === null || Object.keys(str).length === 0
        || Object.is(NaN, parseInt(str.toString()))) {
        const message = `A valid ${input} is needed in query string`
        console.log(message)
        errors.push(message)
    } else {
        console.log(`the ${input} entered is ${str}`)
    }

}
//check if the file exists-- assuming all files are jpeg
function checkIfTheFileAlreadyExists(fullDir: String, fileName: String, errors: Array<string>): void {
    if (existsSync(`${fullDir}${fileName}.jpeg`)) {
        console.log("Your file exists")
    } else {
        const message = "The file does not exist"
        console.log(message)
        errors.push(message)
    }
}


app.use(express.static(thumbDir))

app.get('/api', (req, res) => {

    const errors: Array<string> = []
    const fileName = req.query.filename || ''
    testFileName(fileName.toString(), errors);

    const height = req.query.height || ''
    const width = req.query.width || ''
    testQueryStringNumber(width.toString(), 'width', errors)
    testQueryStringNumber(height.toString(), 'height', errors)

    checkIfTheFileAlreadyExists(fullDir, fileName.toString(), errors)



    //this checks the error array and the thumb and creates an image if is doesn't exist

    if (errors.length > 0) {
        res.send(errors)
    } else {
        //see if the thumbnail doesn't exist then run sharp
        const thumbFileName = `${fileName}_${width}x${height}.jpeg`
        const thumbFilePath = `${thumbDir}${thumbFileName}`
        const thumbExists = fs.existsSync(thumbFilePath)
        if (!thumbExists) {
            console.log("This photo isn't created yet, but Sharp will make your request!")
            //run the image through sharp and render photo
            sharp(fullDir + fileName + '.jpeg')
                .resize(Number(width), Number(height))
                .toFile(thumbFilePath, function (err: Error, info: Object) {
                    if (err === null) {
                        res.send(
                            `<img src="${thumbFileName}" />`
                        )
                    } else {
                        res.send(err)
                    }
                })
        } else {
            //image exists ---show image
            res.send(
                `<img src="${thumbFileName}" />`
            )

        }

    }




})




app.listen(port, () => {
    console.log(`server is working on local host${port}`);
})

export default {
    testFileName,
    testQueryStringNumber,
    checkIfTheFileAlreadyExists,

}