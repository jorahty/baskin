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
  graphql.query('ListAttributes', async (req, res, ctx) => {
    return res(
      ctx.data({
        attribute: [{
          id: '0ce2da04-d05d-46cf-8602-ae58ab7ecaaa',
          name: 'Cars',
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
      query: `{attribute { name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.attribute).toBeDefined();
    });
});

test('List by ID', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{attribute (id: "0ce2da04-d05d-46cf-8602-ae58ab7ecaaa") { name, id }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.attribute).toHaveLength(1);
    });
});