import http from 'http';
import supertest from 'supertest';

import * as db from './db';
import app from '../app';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  await db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll(async () => {
  server.close();
  await new Promise(resolve => setTimeout(resolve, 500));
  db.shutdown();
});

test('Fetch All Users', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{ user { username, email, name } }`,
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
    .post('/graphql')
    .send({
      query: `{ user (username: "nobby_nobody") { email, name } }`,
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
    .post('/graphql')
    .send({
      query: `{ user (email: "molly@books.com") { username, name } }`,
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
    .post('/graphql')
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

test('Change Username', async () => {
  await request
    .post('/graphql')
    .send({
      query: `mutation {updateUsername (
        username: "johndoes1"
        newName: "johnny_boy1"
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
      expect(data.body.data.updateUsername.name).toEqual('John Doe');
      expect(data.body.data.updateUsername.username).toEqual('johnny_boy1');
    });
});

test('Change Email', async () => {
  await request
    .post('/graphql')
    .send({
      query: `mutation {updateEmail (
        username: "johnny_boy1"
        newEmail: "john@gmail.com"
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
      expect(data.body.data.updateEmail.name).toEqual('John Doe');
      expect(data.body.data.updateEmail.email).toEqual('john@gmail.com');
    });
});