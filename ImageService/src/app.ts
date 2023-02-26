import express, { ErrorRequestHandler, Express, Request, Response, Router } from 'express';
// import fs from 'fs';

import fileUpload, { UploadedFile } from 'express-fileupload';
import path from 'path';

import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../build/routes';

const app: Express = express();
app.use(cors());
//app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v0/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});

// Serve all image in /image
app.use('/image', express.static('images'));
//app.use('/api', express.static('api'));

const router = Router();
RegisterRoutes(router);
app.use('/api/v0', router);

// Route for adding new image
// Cite: https://github.com/richardgirges/express-fileupload/tree/master/example
// app.post('/images', (req: Request, res: Response) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }
//
//   const file: fileUpload.UploadedFile | fileUpload.UploadedFile[] = req.files.file;
//   console.log(file);
//
//   if (isSingleFile(file)) {
//     const uploadPath = path.resolve(__dirname, '../') + '/image/web/' + file.name;
//     file.mv(uploadPath);
//   }
//
//   res.status(200).send('Success upload');
// });

// Cite: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-fileupload/express-fileupload-tests.ts
// function isSingleFile(file: UploadedFile | UploadedFile[]): file is UploadedFile {
//   return typeof file === 'object' && (file as UploadedFile).name !== undefined;
// }

// function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
//   return Array.isArray(file);
// }

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
};
app.use(errorHandler);

export default app;
