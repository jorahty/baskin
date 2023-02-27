import supertest from 'supertest';

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

test('GET API Docs', async () => {
  await request
    .get('/api/v0/docs/')
    .expect(200)
    .then(res => {
      expect(res.text).toContain('Swagger UI');
    });
});

test('GET One By URL', async () => {
  await request.get('/97285551-6eea-40e6-8f6a-3b7b39c64d39.jpeg')
    .expect(200)
    .then(res => {
      expect(res.body).toBeDefined();
    });
});

test('POST Bad Media Type', async () => {
  await request
    .post('/api/v0/image')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('files', path.join(__dirname, 'assets/bad.txt'))
    .expect(415);
});

let newImageUrls: string[];

test('POST New', async () => {
  await request
    .post('/api/v0/image')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('files', path.join(__dirname, 'assets/good.jpg'))
    .attach('files', path.join(__dirname, 'assets/good.png'))
    .expect(201)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body).toHaveLength(2);
      newImageUrls = res.body;
    });
});

test('DELETE New', async () => {
  for (const url of newImageUrls) {
    const filename = url.split('/')[url.split('/').length - 1];
    const id = filename.split('.')[0];
    await request
      .delete('/api/v0/image/' + id)
      .expect(204);
  }
});
