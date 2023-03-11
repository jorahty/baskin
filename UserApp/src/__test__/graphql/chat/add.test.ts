import http from 'http';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import supertest from 'supertest';
import 'whatwg-fetch';

import requestHandler from '../requestHandler';
import * as login from '../login';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  login.loginHandlers,
  graphql.mutation('addChat', async (req, res, ctx) => {
    return res(
      ctx.data({
        addChat: {
          id: '52d3f9fd-1c08-41cc-973e-2d2c0d75f4b5',
          name: 'new chat',
        },
      })
    );
  }),
  graphql.mutation('addChatMember', async (req, res, ctx) => {
    const username = req.variables.username;
    if (username === 'molly_member') {
      return res(
        ctx.data({
          addChatMember: {
            username: 'molly_member',
          },
        })
      );
    }
    return res(
      ctx.data({
        addChatMember: {
          username: 'bob_builder',
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

let chatId: string | undefined = undefined;

test('Add Chat', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      query: `
      mutation {
        addChat (name: "new chat") { 
          id
          name 
        } 
      }`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.addChat).toBeDefined();
      chatId = res.body.data.addChat.id;
    });
});

test('Add Chat Member', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      query: `
      mutation {
        addChatMember (id: "${chatId}") { 
          username 
        } 
      }`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.addChatMember).toBeDefined();
      expect(res.body.data.addChatMember.username).toBe('molly_member');
    });
});

test('Add Chat Member (Other)', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      query: `
      mutation {
        addChatMember (username: "bob_builder", id: "${chatId}") { 
          username 
        } 
      }`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.addChatMember).toBeDefined();
      expect(res.body.data.addChatMember.username).toBe('bob_builder');
    });
});
