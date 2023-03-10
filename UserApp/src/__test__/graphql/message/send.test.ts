import http from 'http';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import supertest from 'supertest';
import 'whatwg-fetch';

import * as login from '../login';
import requestHandler from '../requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  login.loginHandlers,
  graphql.mutation('sendMessage', async (req, res, ctx) => {
    return res(
      ctx.data({
        sendMessage: {
          id: 'f94a1252-7d5e-4b87-ae41-7a03f58a4028',
          chat_id: 'f94a1252-7d5e-4b87-ae41-7a03f58a4028',
          sender: 'molly_member',
          content: 'this message is bogus lol',
          date: '2023-01-21T15:20:08.000Z',
        },
      })
    );
  }),
];

const microServiceServer = setupServer(...handlers);

beforeAll(async () => {
  server = http.createServer(requestHandler);
  server.listen();
  microServiceServer.listen();
  request = supertest(server);
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterEach(() => microServiceServer.resetHandlers());

afterAll(done => {
  server.close(done);
  microServiceServer.close();
});

test('Send Message', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      query: `
      mutation {
        sendMessage (
            message: {
                chat_id: "f94a1252-7d5e-4b87-ae41-7a03f58a4028",
                content: "hi" 
            }
        ) {sender, content, date} 
      }`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.sendMessage).toBeDefined();
      expect(res.body.data.sendMessage.sender).toBe('molly_member');
      expect(res.body.data.sendMessage.content).toBe('this message is bogus lol');
      expect(res.body.data.sendMessage.date).toBe('2023-01-21T15:20:08.000Z');
    });
});

test('Send Message (Unauthorized)', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `
      mutation {
        sendMessage (
            message: {
                chat_id: "f94a1252-7d5e-4b87-ae41-7a03f58a4028",
                content: "hi" 
            }
        ) {sender, content, date} 
      }`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});
