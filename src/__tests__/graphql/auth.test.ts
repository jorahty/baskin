import http from 'http'
import supertest from 'supertest';
import 'whatwg-fetch'

import * as db from './db';
import requestHandler from './requestHandler'
import * as login from './login';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll( async () => {
  server = http.createServer(requestHandler);
  server.listen();
  request = supertest(server)
  db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll((done) => {
  server.close(done);
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
  await request.post('/api/graphql')
    .send({query: `{login(username: "${member.username}" password: 
      "${member.password}") { username, accessToken }}`})
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data.login.username).toEqual('molly_member');
      expect(res.body.data.login.accessToken).toBeDefined();
    });
});

test('Wrong Credentials', async () => {
  const member = wrong;
  await request.post('/api/graphql')
    .send({query: `{login(username: "${member.username}" password: 
      "${member.password}") { username, accessToken }}`})
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Non-existent user', async () => {
  const member = wrong;
  await request.post('/api/graphql')
    .send({query: `{login(username: "anna@book.com" password: 
      "${member.password}") { username, accessToken }}`})
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Bad Format', async () => {
  const member = bad;
  await request.post('/api/graphql')
    .send({query: `{login(username: "${member.username}" password: 
      "${member.password}") { username, accessToken }}`})
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Sign up', async () => {
  await request.post('/api/graphql')
    .send({query: `mutation {signUp (input: {
        username: "johndoes1"
        name: "John Doe"
        email: "jd@books.com"
        password: "johndoes"
      }) {
        name, email, username
      }}`})
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.signUp.name).toEqual('John Doe');
      expect(data.body.data.signUp.email).toEqual('jd@books.com');
      expect(data.body.data.signUp.username).toEqual('johndoes1');
    });
});
