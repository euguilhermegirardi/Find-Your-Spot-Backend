const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname); // path.extname(file.originalname) returns the type of the img.
      const name = path.basename(file.originalname, ext); // return the name of the img without the extension.
      callback(null, `${name}-${Date.now()}${ext}`)

    }
  }),
};
