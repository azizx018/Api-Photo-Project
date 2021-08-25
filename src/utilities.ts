const sharp = require('sharp');
const photoDir: string = __dirname + '/photos/';
const fullDir: string = photoDir + 'full/';

//run the image through sharp
function createImage(fileName: String, width: String, height: String, thumbFilePath: String): void {
    sharp(fullDir + fileName + '.jpeg')
        .resize(Number(width), Number(height))
        .toFile(thumbFilePath, function (err: Error) {
        });
}

export default {
    createImage
}

