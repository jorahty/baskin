import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';

import * as db from './db';
import requestHandler from './requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = http.createServer(requestHandler);
  server.listen();
  request = supertest(server);
  await db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll(done => {
  server.close(done);
  db.shutdown();
});

test('Fetch All Products', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{product { id, user, category, name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
      // don't want to check length or specific product in case we add more
    });
});

test('Fetch Product By ID', async () => {
  let id;
  await request
    .post('/api/graphql')
    .send({
      query: `{product { id }}`,
    })
    .expect(200)
    .then(res => {
      id = res.body.data.product[0].id;
    });
  await request
    .post('/api/graphql')
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

test('Fetch Product By User', async () => {
  await request
    .post('/api/graphql')
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

test('Fetch Product By Category', async () => {
  await request
    .post('/api/graphql')
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
