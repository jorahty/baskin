import http from 'http';
import supertest from 'supertest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import 'whatwg-fetch';

import * as db from './db';
import requestHandler from './requestHandler';
import * as login from './login';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const URL = 'http://localhost:3011/graphql';

let password = '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y';
const handlers = [
  rest.post(URL, (req, res, ctx) => {
    return res(
      ctx.json({ data: {
        user: [{
          username: 'molly_member',
          name: 'Molly Member',
          password: password,
        }],
      } }),
    );
  }),
];
const accountservice = setupServer(...handlers);

beforeAll(async () => {
  server = http.createServer(requestHandler);
  server.listen();
  request = supertest(server);
  accountservice.listen();
  db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterEach(() => accountservice.resetHandlers());

afterAll(done => {
  server.close(done);
  accountservice.close();
  db.shutdown();
});

const bad = {
  username: 'molly_at_book',
  password: 'mollymember',
};

const wrong = {
  username: 'molly_member',
  password: 'notmollyspasswd',
};

test('OK', async () => {
  const member = login.molly;
  await request
    .post('/api/graphql')
    .send({
      query: `{signin(username: "${member.username}" password: 
      "${member.password}") { username, accessToken }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data.signin.username).toEqual('molly_member');
      expect(res.body.data.signin.accessToken).toBeDefined();
    });
});

test('Wrong Credentials', async () => {
  const member = wrong;
  await request
    .post('/api/graphql')
    .send({
      query: `{signin(username: "${member.username}" password: 
      "${member.password}") { username, accessToken }}`,
    })
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Non-existent user', async () => {
  const member = wrong;
  await request
    .post('/api/graphql')
    .send({
      query: `{signin(username: "anna@book.com" password: 
      "${member.password}") { username, accessToken }}`,
    })
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Bad Format', async () => {
  password = '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK';
  const member = bad;
  await request
    .post('/api/graphql')
    .send({
      query: `{signin(username: "${member.username}" password: 
      "${member.password}") { username, accessToken }}`,
    })
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});
