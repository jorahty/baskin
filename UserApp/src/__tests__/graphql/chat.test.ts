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
  db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll(done => {
  server.close(done);
  db.shutdown();
});

test('Fetch chats molly', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{chat(username: "molly_member"){id}}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
    });
});

test('Fetch chats anna', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{chat(username: "anna_admin"){id}}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
    });
});

test('Fetch chats nobby', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{chat(username: "nobby_nobody"){id}}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
    });
});

test('Fetch chats mia', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{chat(username: "mia_moderator"){id}}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
    });
});
