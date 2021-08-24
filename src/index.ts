import express, { Request, Response } from 'express';
import fs from 'fs';
import appfunctions from './appfunctions';
import utilities from './utilities';

const app = express();
const port = 3000;
const photoDir = __dirname + '/photos/';
const fullDir = photoDir + 'full/';
const thumbDir = photoDir + 'thumb/';

app.use(express.static(thumbDir));

app.get('/api', (req: Request, res: Response): void => {
  const errors: Array<string> = [];
  const fileName: String = (req.query.filename || '').toString();
  appfunctions.testFileName(fileName.toString(), errors);

  const height: String = (req.query.height || '').toString();
  const width: String = (req.query.width || '').toString();
  appfunctions.testQueryStringNumber(width, 'width', errors);
  appfunctions.testQueryStringNumber(height, 'height', errors);

  appfunctions.checkIfTheFileAlreadyExists(
    fullDir,
    fileName.toString(),
    errors
  );

  //this checks the error array and the thumb and creates an image if is doesn't exist
  if (errors.length > 0) {
    res.json(errors);
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
      utilities.createImage(fileName, width, height, thumbFilePath);


      // sharp(fullDir + fileName + '.jpeg')
      //   .resize(Number(width), Number(height))
      //   .toFile(thumbFilePath, function (err: Error) {
      //     if (err === null) {
      //       res.send(`<img src="${thumbFileName}" />`);
      //     } else {
      //       res.send(err);
      //     }
      //   });
    }
    else {
      //image exists ---show image
      res.send(`<img src="${thumbFileName}" />`);
    }
  }
});

app.listen(port, () => {
  console.log(`server is working on local host${port}`);
});

export default app;
