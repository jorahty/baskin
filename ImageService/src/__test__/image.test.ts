import fs from 'fs';
import supertest, { Response } from 'supertest';
import * as http from 'http';

import app from '../app';
import path from 'path';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll(async () => {
  server.close();
});

test('Load Image from API docs', async () => {
  await request.get('/api/kitten.jpg').expect(200);
});

test('Add Image', async () => {
  const fileContents = fs.readFileSync(__dirname + '/images/medium.jpeg');

  await request
    .post('/images')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', fileContents, { filename: 'medium.jpeg', contentType: 'image/jpeg' })
    .expect(200)
    .then((res: Response) => {
      expect(res).toBeDefined();
      // Remove the image we just added
      // (We don't want an image to be added every time this test runs)
      fs.unlink(path.resolve(__dirname + '../../../images/web/medium.jpeg'), () => null);
    });
});

test('Add No Image', async () => {
  await request.post('/images').set('Content-Type', 'multipart/form-data').expect(400);
});
