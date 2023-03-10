import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export class ImageService {
  public async create(files: Express.Multer.File[]): Promise<string[]> {
    const filePaths: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Generate new id
      const id = uuidv4();

      // Derive file extension from `file.mimetype`
      const fileExtension = file.mimetype.split('/')[1];

      const tmpImage = sharp(file.buffer);

      let width;
      let height;

      try {
        const meta = await tmpImage.metadata();
        width = meta.width;
        height = meta.height;
      } catch (e) {
        continue;
      }

      // Determine file path
      const filePath = path.join(__dirname, '../../public', `${id}.jpeg`);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (width > 1000 || height > 1000) {
        tmpImage.resize(1000);
      }

      // Convert image to a JPEG format
      if (fileExtension !== 'jpg') {
        tmpImage.toFormat('jpeg').jpeg({
          quality: 100,
          chromaSubsampling: '4:4:4',
          force: true,
        });
      }

      // Write to disk (into the directory named `public`)
      await tmpImage.toFile(filePath);

      // Return full URL
      filePaths.push(`${id}`);
    }

    return filePaths;
  }

  public async compress(file: Express.Multer.File): Promise<undefined | Express.Multer.File> {
    const tmpImage = sharp(file.buffer);

    let width;
    let height;

    try {
      const meta = await tmpImage.metadata();
      width = meta.width;
      height = meta.height;
    } catch (e) {
      return undefined;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (width > 1000 || height > 1000) {
      tmpImage.resize(1000);
    }

    // Compress
    tmpImage.toFormat('jpeg').jpeg({
      quality: 80,
      chromaSubsampling: '4:4:4',
      force: true,
    });
    file.buffer = await tmpImage.toBuffer();
    return file;
  }

  public async delete(id: string): Promise<boolean> {
    const pathName = path.join(__dirname, '../../public') + `/${id}.jpeg`;
    if (fs.existsSync(pathName)) {
      fs.unlinkSync(pathName);
    } else {
      return false;
    }

    return true;
  }
}
