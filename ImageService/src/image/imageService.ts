import fileUpload, { UploadedFile } from 'express-fileupload';
import path from 'path';

interface Images {
  file: fileUpload.UploadedFile | fileUpload.UploadedFile[];
}

export class ImageService {
  public async postImage(req: Express.Request): Promise<string | undefined> {
    if (!req.files || Object.keys(req.files).length === 0) {
      return undefined;
    }

    const files: Images = req.files as unknown as Images;

    const file: fileUpload.UploadedFile | fileUpload.UploadedFile[] = files.file;

    let uploadPath;
    let ending;

    if (isSingleFile(file)) {
      ending = '/images/web/' + file.name;
      uploadPath = path.resolve(__dirname, '../../') + ending;
      await file.mv(uploadPath);
    }

    return ending;
  }
}

// Cite: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-fileupload/express-fileupload-tests.ts
function isSingleFile(file: UploadedFile | UploadedFile[]): file is UploadedFile {
  return typeof file === 'object' && (file as UploadedFile).name !== undefined;
}

// function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
//   return Array.isArray(file);
// }
