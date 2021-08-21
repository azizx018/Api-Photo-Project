import express from 'express';
import fs from 'fs';
import appfunctions from './appfunctions';

const app = express();
const port = 3000;

const sharp = require('sharp');
const photoDir = __dirname + '/photos/';
const fullDir = photoDir + 'full/';
const thumbDir = photoDir + 'thumb/';

app.use(express.static(thumbDir));

app.get('/api', (req, res) => {
  const errors: Array<string> = [];
  const fileName = req.query.filename || '';
  appfunctions.testFileName(fileName.toString(), errors);

  const height = req.query.height || '';
  const width = req.query.width || '';
  appfunctions.testQueryStringNumber(width.toString(), 'width', errors);
  appfunctions.testQueryStringNumber(height.toString(), 'height', errors);

  appfunctions.checkIfTheFileAlreadyExists(
    fullDir,
    fileName.toString(),
    errors
  );

  //this checks the error array and the thumb and creates an image if is doesn't exist

  if (errors.length > 0) {
    res.send(errors);
  } else {
    //see if the thumbnail doesn't exist then run sharp
    const thumbFileName = `${fileName}_${width}x${height}.jpeg`;
    const thumbFilePath = `${thumbDir}${thumbFileName}`;
    const thumbExists = fs.existsSync(thumbFilePath);
    if (!thumbExists) {
      console.log(
        "This photo isn't created yet, but Sharp will make your request!"
      );
      //run the image through sharp and render photo
      sharp(fullDir + fileName + '.jpeg')
        .resize(Number(width), Number(height))
        .toFile(thumbFilePath, function (err: Error) {
          if (err === null) {
            res.send(`<img src="${thumbFileName}" />`);
          } else {
            res.send(err);
          }
        });
    } else {
      //image exists ---show image
      res.send(`<img src="${thumbFileName}" />`);
    }
  }
});

app.listen(port, () => {
  console.log(`server is working on local host${port}`);
});

export default app;
