const { v4: uuidv4 } = require('uuid');

const params = fileName => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length -1];

    const imageParams = {
        Bucket: 'user-images-cd28c027-fb21-48b5-9265-277dd0dc8f8d',
        // create a unique file anme and grab the file type
        Key: `${uuidv4()}.${fileType}`,
        // temp storage container of the image file. Once the buffer has been used, the temp storage space is removed by multer.
        Body: fileName.buffer,
        ACL: 'public-read' // allow read access to this file
    };

    return imageParams;
}

module.exports = params;