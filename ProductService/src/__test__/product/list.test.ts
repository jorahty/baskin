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
      query: `{ product { id, user, category, name } }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
    });
});

test('List by ID', async () => {
  let id;
  await request
    .post('/graphql')
    .send({
      query: `{ product { id } }`,
    })
    .expect(200)
    .then(res => {
      id = res.body.data.product[0].id;
    });
  await request
    .post('/graphql')
    .send({
      query: `{product (id: "${id}") { id, user, category, name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
      expect(res.body.data.product).toHaveLength(1);
    });
});

test('List by User', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{product (user: "molly_member") { id, user, category, name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
    });
});

test('List by Category', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{product (category: "toys") { id, user, category, name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
    });
});
