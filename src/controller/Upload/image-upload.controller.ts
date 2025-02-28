import { v4 as uuidv4 } from 'uuid';
import winstonEnvLogger from 'winston-env-logger';
import multer from 'multer';
import { UploadApiResponse } from 'cloudinary';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';
import { image } from '../../util/upload';

import { cloudinary } from '../../config/cloudinary';

import AuthServices from '../../services/Auth/Auth.services';

const imageUpload = (req: any, res: any) => {
  image(req, res, async (err: any) => {
    if (!req.file && !err) respondWithWarning(res, 400, 'No file selected', {});

    if (err && !req.file) respondWithWarning(res, 400, err.message, {});

    const assetName = `${req.file.fieldname}-${uuidv4()}`;

    if (err instanceof multer.MulterError) {
      respondWithWarning(res, 400, 'An error occurred', {});
    } else if (err) {
      respondWithWarning(res, 400, err.message, {});
    }
    try {
      const { id } = req.params;
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        req?.file?.path,
        {
          resource_type: 'image',
          public_id: `${assetName}`,
          height: 64,
          width: 64,
          crop: 'fill',
          folder: 'LearnIT/pictures',
        }
      );

      await AuthServices.updateProfilePicture(id, result.secure_url);

      respondWithSuccess(res, 201, 'Image uploaded successfully', {
        url: result.secure_url,
      });
    } catch (error) {
      winstonEnvLogger.error({ message: 'An error occured', error });
      respondWithWarning(res, 400, 'An error occurred', {});
    }
  });
};

export default imageUpload;
