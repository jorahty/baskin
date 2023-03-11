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

let newChatId: string | undefined = undefined;

test('Create A Chat', async () => {
  await request
    .post('/graphql')
    .send({
      query: `mutation { addChat(name: "New Chat"){ id, name } }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.addChat).toBeDefined();
      newChatId = res.body.data.addChat.id;
    });
});

test('Add a Member to Chat', async () => {
  await request
    .post('/graphql')
    .send({
      query: `mutation { addChatMember(username: "molly_member", id: "${newChatId}"){ username } }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.addChatMember).toBeDefined();
      expect(res.body.data.addChatMember.username).toBe('molly_member');
    });
});
