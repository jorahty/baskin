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
  graphql.mutation('UpdateRoles', async (req, res, ctx) => {
    return res(
      ctx.data({
        updateRoles: {
          username: 'molly_member',
          name: 'molly',
          email: 'mollymember@books.com',
        },
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

test('Edit attribute', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {updateRoles(input: {
        username: "molly_member",
        roles: ["moderator", "member"]
      }) 
      {
        username
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      console.log(data.body.errors);
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.updateRoles.username).toBeDefined();
      expect(data.body.data.updateRoles.username).toEqual('molly_member');
    });
});