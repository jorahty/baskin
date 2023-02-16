import http from "http";
import supertest from "supertest";
import "whatwg-fetch";

import * as db from "./db";
import * as login from './login';
import requestHandler from "./requestHandler";

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = http.createServer(requestHandler);
  server.listen();
  request = supertest(server);
  await db.reset();
  return new Promise((resolve) => setTimeout(resolve, 500));
});

afterAll((done) => {
  server.close(done);
  db.shutdown();
});

test('Create new product without header', async () => {
  await request.post('/api/graphql')
    .send({query: `mutation {create (
        name:"Toy robot"
        description: "brand new"
        category:"toys"
        price:100
        quantity: 1
        pictures: ["temp"]
      ) {
        name, description, category, price, quantity, user
      }}`})
    .then((data) => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Create new product corrupt header', async () => {
  await request.post('/api/graphql')
    .set('Authorization', 'Bearer ' + 'garbage')
    .send({query: `mutation {create (
        name:"Toy robot"
        description: "brand new"
        category:"toys"
        price:100
        quantity: 1
        pictures: ["temp"]
      ) {
        name, description, category, price, quantity, user
      }}`})
    .then((data) => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Create new product without member roles', async () => {
  const accessToken = await login.asNobby(request);
  await request.post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({query: `mutation {create (
        name:"Toy robot"
        description: "brand new"
        category:"toys"
        price:100
        quantity: 1
        pictures: ["temp"]
      ) {
        name, description, category, price, quantity, user
      }}`})
    .then((data) => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Create new message', async () => {
  const accessToken = await login.asMolly(request);
  await request.post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({query: `mutation {create (
        name:"Toy robot"
        description: "brand new"
        category:"toys"
        price:100
        quantity: 1
        pictures: ["temp"]
      ) {
        name, description, category, price, quantity, user
      }}`})
    .expect(200)
    .expect('Content-Type', /json/)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.create.name).toEqual('Toy robot');
      expect(data.body.data.create.description).toEqual('brand new');
      expect(data.body.data.create.user).toEqual('molly_member');
    });
});