import http from 'http';
import supertest from 'supertest';

import * as db from '../db';
import app from '../../app';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll(done => {
  server.close(done);
  db.shutdown();
});

test('Fetch by Chat Id: List Anna and Molly Messages', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{ message(id: "f94a1252-7d5e-4b87-ae41-7a03f58a4028"){id} }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.message).toBeDefined();
    });
});

test('Fetch by Chat Id: List Mia and Nobby Messages', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{ message(id: "52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4"){id} }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.message).toBeDefined();
    });
});

test('messageStat', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{messageStat{ count }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.messageStat.count).toBeDefined();
    });
});
