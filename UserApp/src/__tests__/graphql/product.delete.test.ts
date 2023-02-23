import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';

import * as db from './db';
import * as login from './login';
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


test('Delete product', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {delete (
        product: "038b7e70-a5c0-47e6-80f3-5b1772bb4a0d"
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.delete.user).toEqual('molly_member');
    });
});

test('Delete product not as owner', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {delete (
        product: "0ce2da04-d05d-46cf-8602-ae58ab7ec215"
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Delete nonexistent product', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {delete (
        product: "0ce2da04-d05d-46cf-8602-ae58ab7ec000"
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});