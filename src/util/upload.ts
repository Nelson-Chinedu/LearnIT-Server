import Multer from 'multer';

const fileTypes = /mp4/;

const video = Multer({
  storage: Multer.diskStorage({}),

  fileFilter: (_req, file, cb) => {
    const mime = fileTypes.test(file.mimetype);
    if (mime) {
      return cb(null, true);
    }
    cb({ message: 'unable to upload', name: 'invalid file format' });
  },
}).single('video');

export { video };
