import http from 'http';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import supertest from 'supertest';
import 'whatwg-fetch';

import requestHandler from '../requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  graphql.query('ListChats', async (req, res, ctx) => {
    return res(
      ctx.data({
        chat: [
          {
            id: '52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4',
            name: 'Hiking',
            members: [
              { username: 'molly_member', name: 'molly member' },
              { username: 'anna_admin', name: 'anna admin' },
            ],
          },
        ],
      })
    );
  }),
  graphql.query('getAccountName', async (req, res, ctx) => {
    return res(
      ctx.data({
        user: [
          {
            name: 'molly member',
          },
        ],
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

test('List Chats', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{ chat (username: "molly_member") { id, name, members { username, name } } }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.chat).toBeDefined();
    });
});
