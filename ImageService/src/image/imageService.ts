import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


export class ImageService {
  public async create(
    files: Express.Multer.File[]
  ): Promise<string[]> {
    return files.map(file => {
      // Generate new id
      const id = uuidv4();

      // Derive file extention from `file.mimetype`
      const fileExtention = file.mimetype.split('/')[1];

      // Define file name
      const fileName = id + '.' + fileExtention;
      
      // Determine file path
      const filePath = path.join(__dirname, '../../public', fileName);
      
      // Write to disk (into the directory named `public`)
      fs.writeFileSync(filePath, file.buffer);

      // Return full URL
      return 'http://localhost:3012/' + fileName;
    });
  }

  public async delete(id: string): Promise<void> {
    const directory = path.join(__dirname, '../../public');
    fs.readdir(directory, (_, files) => {
      files.forEach(file => {
        if (file.split('.')[0] === 'myfile') fs.unlinkSync(directory + file);
      });
    });
  }
}
