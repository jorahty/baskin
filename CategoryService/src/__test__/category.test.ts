import http from 'http';
import supertest from 'supertest';

import * as db from './db';
import app from '../app';

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

test('Fetch All Categories', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{category { name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.category).toBeDefined();
    });
});

test('Fetch Category By ID', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{category (slug: "clothing") { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.category).toBeDefined();
      expect(res.body.data.category).toHaveLength(1);
    });
});
