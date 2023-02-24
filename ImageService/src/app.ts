import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());

// Setup swagger-ui
import swaggerDocument from '../swagger.json';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve all images in /image
app.use('/image', express.static('image'));

// Route for adding new image
app.post('/image', (req: Request, res: Response) => {
  const { fileName, imageData } = req.body;

  const filePath = path.join(__dirname, '../image', fileName);

  fs.writeFile(filePath, imageData, () => res.send(fileName));
});

export default app;
