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

test('Favorite product', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {favorite (
        product: "0ce2da04-d05d-46cf-8602-ae58ab7ec215"
      ) {
        user, product
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.favorite.user).toEqual('molly_member');
    });
});

test('Get favorite products', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `query {getFavorites (
        product: "0ce2da04-d05d-46cf-8602-ae58ab7ec215"
      ) {
        user, product
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.getFavorites[0].user).toEqual('molly_member');
    });
});

test('Unfavorite product', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {unfavorite (
        product: "0ce2da04-d05d-46cf-8602-ae58ab7ec215"
      ) {
        user, product
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.unfavorite.user).toEqual('molly_member');
    });
});
