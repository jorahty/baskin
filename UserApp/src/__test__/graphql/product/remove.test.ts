import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';

import * as login from '../login';
import requestHandler from '../requestHandler';

import { setupServer } from 'msw/node';
import { graphql } from 'msw';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  login.loginHandlers,
  graphql.query('ListProducts', async (req, res, ctx) => {
    const { id } = req.variables;

    if (id === 'abcZdiabca')
      return res(
        ctx.data({
          product: [],
        })
      );

    if (id === 'dbcZdiabca')
      return res(
        ctx.data({
          product: [
            {
              user: 'not_molly_member',
            },
          ],
        })
      );

    return res(
      ctx.data({
        product: [
          {
            id: '123',
            user: 'molly_member',
            category: 'clothing',
            name: 'HOODIE',
            price: 250,
            date: '2023-02-09T06:43:08.000Z',
            discount: 0,
            quantity: 1,
            description: 'Never worn',
            images: ['https://images.pexels.com/whatever'],
          },
        ],
      })
    );
  }),
  graphql.mutation('RemoveProduct', async (req, res, ctx) => {
    return res(
      ctx.data({
        removeProduct: {
          id: 'X0bZdiabca',
          user: 'molly_member',
          category: 'clothing',
          name: 'Toy robot',
          price: 250,
          date: '2023-02-09T06:43:08.000Z',
          discount: 0,
          quantity: 1,
          description: 'brand new',
          images: ['https://images.pexels.com/whatever'],
        },
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

afterAll(done => {
  server.close(done);
  microServiceServer.close();
});

let accessToken: string | undefined;

test('Remove Product', async () => {
  accessToken = await login.asMolly(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {removeProduct (
        product: "X0bZdiabca"
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
      expect(data.body.data.removeProduct.user).toEqual('molly_member');
    });
});

test('Remove Missing Product', async () => {
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {removeProduct (
        product: "abcZdiabca"
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Remove Product as not Owner', async () => {
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {removeProduct (
        product: "dbcZdiabca"
      ) {
        name, description, category, price, quantity, user
      }}`,
    })
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});
