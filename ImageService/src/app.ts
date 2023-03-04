import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../build/swagger.json';
import { RegisterRoutes } from '../build/routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Generate tsoa routes
const router = Router();
RegisterRoutes(router);
app.use('/api/v0', router);

// Serve all image files in the directory named `public`
app.use(express.static('public'));

// Serve swagger UI
app.use('/api/v0/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
