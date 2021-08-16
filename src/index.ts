import express from 'express';
import fs from 'fs';;

const app = express();
const port = 3000;


const sharp = require('sharp');
const photoDir = __dirname + '/photos/'
const fullDir = photoDir + 'full/'
const thumbDir = photoDir + 'thumb/'



app.use(express.static(thumbDir))
//app.use('/photos', express.static('thumb'));

app.get('/api', (req, res) => {
    const errors = []
    //check for query string that all variables exist
    const fileName = req.query.filename
    if (fileName === undefined || fileName === null || Object.keys(fileName).length === 0) {
        console.log("filename needed in query string")
        errors.push("filename needed in query string")
    } else {
        console.log(`the filename entered is ${fileName}`)
    }
    //check that a width was entered as a number
    //Need to check if this value is numberic
    const width = req.query.width
    if (width === undefined || width === null || Object.keys(width).length === 0
        || Object.is(NaN, parseInt(width.toString()))) {
        console.log("valid width needed in query string")
        errors.push("valid width needed in query string")
    } else {
        console.log(`the width entered is ${width}`)
    }
    //this checks that the height has a value and is a valid number
    const height = req.query.height
    if (height === undefined || height === null || Object.keys(height).length === 0
        || Object.is(NaN, parseInt(height.toString()))) {
        console.log("valid height needed in query string")
        errors.push("valid height needed in query string")
    } else {
        console.log(`the width entered is ${height}`)
    }

    //check if the file exists-- assuming all files are jpeg
    if (fs.existsSync(fullDir + fileName + '.jpeg')) {
        console.log("The file exists")
    } else {
        console.log("file does not exist")
        errors.push("file does not exist")
    }

    //if there are any errors res.send them
    if (errors.length > 0) {
        res.send(errors)
    } else {
        //see if the thumbnail doesn't exist then run sharp
        const thumbFileName = `${fileName}_${width}x${height}.jpeg`
        const thumbFilePath = `${thumbDir}${thumbFileName}`
        const thumbExists = fs.existsSync(thumbFilePath)
        if (!thumbExists) {
            console.log("Hey I'm misssing!")
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