import express from 'express';
import fs from 'fs';;
import url from 'url';

const app = express();
const port = 3000;

const sharp = require('sharp');
const inputPhoto = __dirname + '/photos/full/';
const outputPhoto = __dirname + '/photos/thumb/';


//app.use('/thumb', express.static(__dirname + '/photos'))
app.get('/api', (req, res) => {

    //check for query string that all variables exist
    const fileName = req.query.filename
    if (fileName === undefined || fileName === null || Object.keys(fileName).length === 0) {
        console.log("I need a filename")
    } else {
        console.log(`the filename entered is ${fileName}`)
    }
    //check that a width was entered as a number
    //Need to check if this value is numberic
    const width = req.query.width
    if (width === undefined || width === null || Object.keys(width).length === 0
        || Object.is(NaN, parseInt(width.toString()))) {
        console.log("I need a valid width")
    } else {
        console.log(`the width entered is ${width}`)
    }
    //this checks is the height value is a valid number
    const height = req.query.height
    if (height === undefined || height === null || Object.keys(height).length === 0
        || Object.is(NaN, parseInt(height.toString()))) {
        console.log("I need a valid height")
    } else {
        console.log(`the width entered is ${height}`)
    }


    //check if the file exists
    // fs.exists(`inputPhoto + ${fileName}`, (exist) => {
    //     if (exist) {
    //         console.log("I got your file")
    //     } else {
    //         console.log("no file")
    //     }
    // });
    // console.log(__dirname)
    //if there are any errors res.send them
    //see if the thumbnail doesn't exist then run sharp 
    //render photo

    sharp(inputPhoto)
        .resize(200, 200)
        .toFile(outputPhoto, function (err: Error, info: Object) {
            // output.jpg is a 200 pixels wide and 200 pixels high image
            // containing a scaled and cropped version of input.jpge
        })
    res.send();
});




app.listen(port, () => {
    console.log(`server is working on local host${port}`);
});