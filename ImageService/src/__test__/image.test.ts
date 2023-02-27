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

test('Load docs', async () => {
  await request
    .get('/api/v0/docs/')
    .expect(200)
    .then(res => {
      expect(res.text).toContain('Swagger UI');
    });
});

test('Load Image', async () => {
  await request.get('/images/p_0d0d395a267945ac8befa09c392d3c6d_a.jpg');
});

test('Add Image', async () => {
  const fileContents = fs.readFileSync(__dirname + '/images/medium.jpeg');

  await request
    .post('/api/v0/images')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', fileContents, { filename: 'medium.jpeg', contentType: 'image/jpeg' })
    .expect(201)
    .then((res: Response) => {
      expect(res).toBeDefined();
      // Remove the image we just added
      // (We don't want an image to be added every time this test runs)
      fs.unlink(path.resolve(__dirname + '../../../images/web/medium.jpeg'), () => null);
    });
});

test('Add No Image', async () => {
  await request.post('/api/v0/images').set('Content-Type', 'multipart/form-data').expect(400);
});
