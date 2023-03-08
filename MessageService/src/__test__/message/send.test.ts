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

test('Send Message', async () => {
  await request
    .post('/graphql')
    .send({
      query: `mutation { sendMessage (message: {
        chat_id: "f94a1252-7d5e-4b87-ae41-7a03f58a4028",
        sender: "molly_member",
        content: "this message is bogus lol"
      }) {sender, content, id} }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.sendMessage).toBeDefined();
      expect(res.body.data.sendMessage.id).toBeDefined();
      expect(res.body.data.sendMessage.sender).toBe('molly_member');
      expect(res.body.data.sendMessage.content).toBe('this message is bogus lol');
    });
});
