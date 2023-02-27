import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';

import * as db from '../db';
import * as login from '../login';
import requestHandler from '../requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

import { setupServer } from 'msw/node';

const handlers = [login.loginHandlers];

const microServiceServer = setupServer(...handlers);

beforeAll(async () => {
  server = http.createServer(requestHandler);
  server.listen();
  microServiceServer.listen();
  request = supertest(server);
  await db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll(done => {
  server.close(done);
  microServiceServer.close();
  db.shutdown();
});


test('Remove Product', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {removeProduct (
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
      expect(data.body.data.removeProduct.user).toEqual('molly_member');
    });
});

test('Remove Product not as Owner', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {removeProduct (
        product: "0ce2da04-d05d-46cf-8602-ae58ab7ec215"
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Remove Missing Product', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {removeProduct (
        product: "0ce2da04-d05d-46cf-8602-ae58ab7ec000"
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});