import Multer from 'multer';

const video_fileTypes = /mp4/;
const image_fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const video = Multer({
  storage: Multer.diskStorage({}),

  fileFilter: (_req, file, cb) => {
    const mime = video_fileTypes.test(file.mimetype);
    if (mime) {
      return cb(null, true);
    }
    cb({ message: 'unable to upload', name: 'invalid file format' });
  },
}).single('video');

const image = Multer({
  storage: Multer.diskStorage({}),
  limits: {
    fileSize: 1000000, // allow image file size of 1Mb
  },
  fileFilter: (_req, file, cb) => {
    const mime = image_fileTypes.includes(file.mimetype.toLowerCase());
    if (mime) {
      return cb(null, true);
    }
    cb({
      name: 'unable to upload',
      message: 'Image must be a jpg, or png file',
    });
  },
}).single('image');

export { video, image };
