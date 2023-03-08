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
  await db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll(done => {
  server.close(done);
  db.shutdown();
});

test('List All', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{attribute { name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.attribute).toBeDefined();
    });
});

test('List by ID', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{attribute (id: "X0bZdioM6D") { name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.attribute).toHaveLength(1);
    });
});
