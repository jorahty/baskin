import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


export class ImageService {
  public async create(
    files: Express.Multer.File[]
  ): Promise<string[]> {
    return files.map(file => {
      const id = uuidv4();
      const fileExtention = file.mimetype.split('/')[1];
      const fileName = `${id}.${fileExtention}`;
      const filePath = path.join(__dirname, '../../public', fileName);
      fs.writeFileSync(filePath, file.buffer);
      return 'http://localhost:3012/' + fileName;
    });
  }
}
