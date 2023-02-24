import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

// Serve all images in /image
app.use('/image', express.static('image'));

// Route for adding new image
app.post('/image', (req: Request, res: Response) => {
  const { fileName, imageData } = req.body;

  const filePath = path.join(__dirname, '../image', fileName);

  const buffer = Buffer.from(imageData, 'base64');

  fs.writeFile(filePath, buffer, () => res.send(fileName));
});

export default app;
