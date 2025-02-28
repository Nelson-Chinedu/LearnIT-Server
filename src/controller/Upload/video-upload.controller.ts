import { v4 as uuidv4 } from 'uuid';
import winstonEnvLogger from 'winston-env-logger';
import multer from 'multer';
import { UploadApiResponse } from 'cloudinary';

import { respondWithSuccess, respondWithWarning } from '../../util/httpResponse';
import { video } from '../../util/upload';

import { cloudinary } from '../../config/cloudinary';

const videoUpload = (req: any, res: any) => {
  video(req, res, async (err: any) => {
    if (!req.file) respondWithWarning(res, 400, 'No file selected', {});

    const assetName = `${req.file.fieldname}-${uuidv4()}`;

    if (err instanceof multer.MulterError) {
      respondWithWarning(res, 400, 'An error occurred', {});
    } else if (err) {
      respondWithWarning(res, 400, err.message, {});
    }
    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        req?.file?.path,
        {
          resource_type: 'video',
          public_id: `LearnIT/${assetName}`,
          chunk_size: 6000000,
          eager: [
            {
              width: 300,
              height: 300,
              crop: 'pad',
              audio_codec: 'none',
            },
            {
              width: 160,
              height: 100,
              crop: 'crop',
              gravity: 'south',
              audio_codec: 'none',
            },
          ],
        }
      );

      respondWithSuccess(res, 201, 'Video uploaded successfully', {
        url: result.secure_url,
      });
    } catch (error) {
      winstonEnvLogger.error({ message: 'An error occured', error });
      respondWithWarning(res, 400, 'An error occurred', {});
    }
  });
};

export default videoUpload;
