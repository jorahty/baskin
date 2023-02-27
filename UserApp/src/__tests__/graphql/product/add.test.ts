import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';

import * as login from '../login';
import requestHandler from '../requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

import { setupServer } from 'msw/node';
import { graphql } from 'msw';

const handlers = [
  login.loginHandlers,
  graphql.mutation('AddProduct', async (req, res, ctx) => {
    return res(
      ctx.data({
        addProduct: {
          id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
          user: 'molly_member',
          category: 'clothing',
          name: 'Toy robot',
          price: 250,
          date: '2023-02-09T06:43:08.000Z',
          discount: 0,
          quantity: 1,
          description: 'brand new',
          pictures: [
            'https://images.pexels.com/whatever',
          ],
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

test('Create new product without header', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `mutation {addProduct (
        name:"Toy robot"
        description: "brand new"
        category:"toys"
        price:100
        quantity: 1
        pictures: ["temp"]
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Create new product corrupt header', async () => {
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + 'garbage')
    .send({
      query: `mutation {addProduct (
        name:"Toy robot"
        description: "brand new"
        category:"toys"
        price:100
        quantity: 1
        pictures: ["temp"]
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Create new product without member roles', async () => {
  const accessToken = await login.asNobby(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {addProduct (
        name:"Toy robot"
        description: "brand new"
        category:"toys"
        price:100
        quantity: 1
        pictures: ["temp"]
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Create new product', async () => {
  const accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {addProduct (
        name:"Toy robot"
        description: "brand new"
        category:"toys"
        price:100
        quantity: 1
        pictures: ["temp"]
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.addProduct.name).toEqual('Toy robot');
      expect(data.body.data.addProduct.description).toEqual('brand new');
      expect(data.body.data.addProduct.user).toEqual('molly_member');
    });
});
