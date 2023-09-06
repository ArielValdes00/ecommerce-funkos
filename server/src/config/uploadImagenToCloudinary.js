import { PassThrough } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

export const uploadImageToCloudinary = async (file) => {
    try {
        if (!file || !file.buffer) {
            throw new Error('No file provided or file has no buffer.');
        }

        const bufferStream = new PassThrough();
        bufferStream.end(file.buffer);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
            bufferStream.pipe(uploadStream);
        });

        return result.secure_url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

