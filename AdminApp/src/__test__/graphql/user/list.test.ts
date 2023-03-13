import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';
import requestHandler from '../requestHandler';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import * as login from '../login';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  login.loginHandlers,
  graphql.query('ListUsers', async (req, res, ctx) => {
    return res(
      ctx.data({
        user: [{
          username: 'molly_member',
          name: 'molly',
          email: 'mollymember@books.com',
          roles: ['member'],
        }],
      }),
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

afterAll(done => {
  server.close(done);
  microServiceServer.close();
});


test('List All', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{user { name }}`,
    })
    .expect(200)
    .then(res => {
      console.log(res.body);
      expect(res.body.data.user).toBeDefined();
    });
});

test('List by ID', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{user (username: "molly_member") { name, username }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.user).toHaveLength(1);
    });
});