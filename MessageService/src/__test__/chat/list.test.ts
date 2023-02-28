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

test('List Molly\'s Chats', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{chat(username: "molly_member"){id}}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.chat).toBeDefined();
    });
});

test('List Anna\'s Chats', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{chat(username: "anna_admin"){id}}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.chat).toBeDefined();
    });
});

test('List Nobby\'s Chats', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{ chat(username: "nobby_nobody"){id} }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.chat).toBeDefined();
    });
});

test('List Mia\'s Chats', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{ chat(username: "mia_moderator"){id} }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.chat).toBeDefined();
    });
});
