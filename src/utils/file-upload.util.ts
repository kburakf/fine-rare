import fs from 'fs';
import { Readable } from 'stream';

export const uploadDir = './uploads';

export const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

export const saveFileUpload = (
  createReadStream: () => Readable,
  filename: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const path = `${uploadDir}/${filename}`;
    const out = fs.createWriteStream(path);
    const stream = createReadStream();

    stream.pipe(out);

    out.on('finish', () => resolve(path));
    out.on('error', reject);
  });
};
