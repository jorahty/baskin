import fs from 'fs';
import supertest from 'supertest';
import * as http from 'http';

import app from '../app';

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

test('Load Image', async () => {
  await request.get('/image/kitten.jpg')
    .expect(200);
});

test('Add Image', async () => {
  await request.post('/image')
    .send({
      fileName: 'new.txt',
      imageData: '1234',
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();

      // Remove the image we just added
      // (We don't want an image to be added every time this test runs)
      fs.unlink(__dirname + '/../../image/new.txt', () => (null));
    });
});

test('Bad Request Body', async () => {
  await request.post('/image')
    .send({
      wrong: 'format',
    })
    .expect(400);
});
