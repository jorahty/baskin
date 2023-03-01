import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';

import requestHandler from './requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

import { graphql } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  graphql.mutation('addNewUser', async (req, res, ctx) => {
    return res(
      ctx.data({
        addUser: {
          username: 'johndoes1',
          name: 'John Doe',
          email: 'jd@books.com',
        },
      })
    );
  }),
  graphql.query('listUser', async (req, res, ctx) => {
    return res(
      ctx.data({
        user: [
          {
            username: 'johndoes1',
            name: 'John Doe',
            email: 'jd@books.com',
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

afterAll(async () => {
  server.close();
  microServiceServer.close();
  await new Promise(resolve => setTimeout(resolve, 500));
});

test('Fetch All Users', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `query user { user { username, email, name } }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.user).toBeDefined();
      // wont expect a certain length in case we add any users in future
    });
});

test('Fetch User by Username', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `query user { user (username: "nobby_nobody") { email, name } }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user).toHaveLength(1);
    });
});

test('Fetch User by Email', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `query user { user (email: "molly@books.com") { username, name } }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user).toHaveLength(1);
    });
});

test('Sign up', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `mutation {addUser (input: {
        username: "johndoes1"
        name: "John Doe"
        email: "jd@books.com"
        password: "johndoes"
      }) {
        name, email, username
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.addUser.name).toEqual('John Doe');
      expect(data.body.data.addUser.email).toEqual('jd@books.com');
      expect(data.body.data.addUser.username).toEqual('johndoes1');
    });
});
