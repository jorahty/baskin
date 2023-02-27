import http from 'http';
import supertest from 'supertest';
import * as login from './login';
import 'whatwg-fetch';

import * as db from './db';
import requestHandler from './requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

import { graphql } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  graphql.mutation('changeUsername', async (req, res, ctx) => {
    return res(ctx.data({
      updateUsername: {
        username: 'molly_member',
        name: 'Molly Member',
        email: 'molly@books.com',
      },
    },
    ));
  }),
  graphql.mutation('changeEmail', async (req, res, ctx) => {
    return res(ctx.data({
      updateUsername: {
        username: 'molly_member',
        name: 'Molly Member',
        email: 'john@gmail.com',
      },
    },
    ));
  }),
  login.loginHandlers,
];

const microServiceServer = setupServer(...handlers);

beforeAll(async () => {
  server = http.createServer(requestHandler);
  server.listen();
  microServiceServer.listen();
  request = supertest(server);
  await db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll(async () => {
  server.close();
  microServiceServer.close();
  await new Promise(resolve => setTimeout(resolve, 500));
  db.shutdown();
});

test('Change Username', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation updateUsername {updateUsername (
        newName: "molly_member"
      ) {
        name, username, email
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.updateUsername.name).toEqual('Molly Member');
      expect(data.body.data.updateUsername.username).toEqual('molly_member');
    });
});

test('Change Email', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation updateEmail {updateEmail (
        newEmail: "john@gmail.com"
      ) {
        name, email
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.updateEmail.name).toEqual('Molly Member');
      expect(data.body.data.updateEmail.email).toEqual('john@gmail.com');
    });
});

