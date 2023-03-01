import http from 'http';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import supertest from 'supertest';
import 'whatwg-fetch';

import requestHandler from '../requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  graphql.query('listMessages', async (req, res, ctx) => {
    return res(
      ctx.data({
        message: [
          {
            id: 'f94a1252-7d5e-4b87-ae41-7a03f58a4028',
            chat_id: 'f94a1252-7d5e-4b87-ae41-7a03f58a4028',
            sender: 'eric_hdez',
            content: 'this message is bogus lol',
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

test('List Messages', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{ message (id: "f94a1252-7d5e-4b87-ae41-7a03f58a4028") {sender, content} }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.message).toBeDefined();
    });
});
