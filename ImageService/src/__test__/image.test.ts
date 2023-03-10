import supertest from 'supertest';

import * as http from 'http';

import app from '../app';
import path from 'path';
import fs from 'fs';
import { addImage } from './image';

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
  await request
    .get('/97285551-6eea-40e6-8f6a-3b7b39c64d39.jpeg')
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
      const newImageUrls: string[] = res.body;

      // Delete after done
      newImageUrls.map(id => {
        fs.unlinkSync(path.resolve(__dirname, '../../') + `/public/${id}.jpeg`);
      });
    });
});

test('POST New - Large Image', async () => {
  await addImage(request, path.join(__dirname, 'assets/large.jpg'));
});

test('DELETE New', async () => {
  let newId;

  await request
    .post('/api/v0/image')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('files', path.join(__dirname, 'assets/large.jpg'))
    .expect(201)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body).toHaveLength(1);
      newId = res.body[0];
    });

  await request.del(`/api/v0/image/${newId}`).expect(200);
});

test('DELETE Non-Existing', async () => {
  await request.del(`/api/v0/image/08f7e135-01e6-445b-97eb-884e10640289`).expect(404);
});

test('POST New - 3 Images, 1 Corrupt File', async () => {
  await request
    .post('/api/v0/image')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('files', path.join(__dirname, 'assets/corrupt.jpeg'))
    .attach('files', path.join(__dirname, 'assets/good.jpg'))
    .attach('files', path.join(__dirname, 'assets/good.png'))
    .expect(201)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body).toHaveLength(2);
      const newImageUrls: string[] = res.body;

      // Delete after done
      newImageUrls.map(id => {
        fs.unlinkSync(path.resolve(__dirname, '../../') + `/public/${id}.jpeg`);
      });
    });
});

test('POST New - Compression', async () => {
  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/large.jpg'))
    .expect(200)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body.buffer).toBeDefined();
      // fs.writeFileSync('oop.jpeg', new Int8Array(res.body.buffer.data));
    });
});

test('POST New - Compression - Long and Tall images', async () => {
  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/long_image.jpg'))
    .expect(200)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body.buffer).toBeDefined();
      // fs.writeFileSync('oop.jpeg', new Int8Array(res.body.buffer.data));
    });

  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/tall_image.jpg'))
    .expect(200)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body.buffer).toBeDefined();
      // fs.writeFileSync('oop.jpeg', new Int8Array(res.body.buffer.data));
    });
});

test('POST New - Compression - Wrong Format', async () => {
  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/bad.txt'))
    .expect(415);
});

test('POST - Compression - Corrupted', async () => {
  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/corrupt.jpeg'))
    .expect(415);
});

test('POST New - Compression', async () => {
  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/large.jpg'))
    .expect(200)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body.buffer).toBeDefined();
      // fs.writeFileSync('oop.jpeg', new Int8Array(res.body.buffer.data));
    });
});

test('POST New - Compression - Long and Tall images', async () => {
  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/long_image.jpg'))
    .expect(200)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body.buffer).toBeDefined();
      // fs.writeFileSync('oop.jpeg', new Int8Array(res.body.buffer.data));
    });

  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/tall_image.jpg'))
    .expect(200)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body.buffer).toBeDefined();
      // fs.writeFileSync('oop.jpeg', new Int8Array(res.body.buffer.data));
    });
});

test('POST New - Compression - Wrong Format', async () => {
  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/bad.txt'))
    .expect(415);
});

test('POST - Compression - Corrupted', async () => {
  await request
    .post('/api/v0/image/compress')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('file', path.join(__dirname, 'assets/corrupt.jpeg'))
    .expect(415);
});
