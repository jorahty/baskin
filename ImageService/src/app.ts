import express, { Express, Request, Response, Router } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../build/routes';
import fileUpload from 'express-fileupload';

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.use('/api/v0/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});

// Serve all image in /image
app.use('/images', express.static('images'));

const router = Router();
RegisterRoutes(router);
app.use('/api/v0', router);

// const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
//   res.status(err.status).json({
//     message: err.message,
//     errors: err.errors,
//     status: err.status,
//   });
// };
// app.use(errorHandler);

export default app;
