import express, { Express, Request, Response } from 'express';
// import fs from 'fs';

import fileUpload, { UploadedFile } from 'express-fileupload';
import path from 'path';
// import { RegisterRoutes } from '../build/routes';

// import cors from 'cors';
// import swaggerUi from 'swagger-ui-express';

const app: Express = express();
// app.use(cors());
app.use(fileUpload());
// app.use(express.json());

// Serve all images in /images
app.use('/images', express.static('images'));
app.use('/api', express.static('api'));

// Route for adding new image
// Cite: https://github.com/richardgirges/express-fileupload/tree/master/example
app.post('/images', (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file: fileUpload.UploadedFile | fileUpload.UploadedFile[] = req.files.file;

  if (isSingleFile(file)) {
    const uploadPath = path.resolve(__dirname, '../') + '/images/web/' + file.name;
    file.mv(uploadPath);
  }

  res.status(200).send('Success upload');
});

// Cite: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-fileupload/express-fileupload-tests.ts
function isSingleFile(file: UploadedFile | UploadedFile[]): file is UploadedFile {
  return typeof file === 'object' && (file as UploadedFile).name !== undefined;
}

// function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
//   return Array.isArray(file);
// }

export default app;
