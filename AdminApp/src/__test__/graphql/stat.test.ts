import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';
import requestHandler from './requestHandler';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import * as login from './login';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  login.loginHandlers,
  graphql.query('StatUsers', async (req, res, ctx) => {
    return res(
      ctx.data({
        userStat: { count: 4 },
      }),
    );
  }),
  graphql.query('StatMessages', async (req, res, ctx) => {
    return res(
      ctx.data({
        messageStat: { count: 4 },
      }),
    );
  }),
  graphql.query('StatChats', async (req, res, ctx) => {
    return res(
      ctx.data({
        chatStat: { count: 4 },
      }),
    );
  }),
  graphql.query('StatAttributes', async (req, res, ctx) => {
    return res(
      ctx.data({
        attributeStat: { count: 4 },
      }),
    );
  }),
  graphql.query('StatCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        categoryStat: { count: 4 },
      }),
    );
  }),
  graphql.query('StatProducts', async (req, res, ctx) => {
    return res(
      ctx.data({
        productStat: { count: 4 },
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
      query: `{stat { user, message, chat }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.stat).toBeDefined();
      expect(res.body.data.stat.user).toBeDefined();
    });
});
