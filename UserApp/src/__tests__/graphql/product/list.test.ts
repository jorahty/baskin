import http from 'http';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import supertest from 'supertest';
import 'whatwg-fetch';

import requestHandler from '../requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  graphql.query('ListProducts', async (req, res, ctx) => {
    return res(
      ctx.data({
        product: [
          {
            id: '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d',
            user: 'molly_member',
            category: 'clothing',
            name: 'Air Jordan 15',
            price: 250,
            date: '2023-02-09T06:43:08.000Z',
            discount: 0,
            quantity: 1,
            description: 'Never worn',
            pictures: ['https://images.pexels.com/whatever'],
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

afterEach(() => microServiceServer.resetHandlers());

afterAll(done => {
  server.close(done);
  microServiceServer.close();
});

test('Fetch All Products', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{product { id, user, category, name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
      // don't want to check length or specific product in case we add more
    });
});

test('Fetch Product By ID', async () => {
  let id;
  await request
    .post('/api/graphql')
    .send({
      query: `{product { id }}`,
    })
    .expect(200)
    .then(res => {
      id = res.body.data.product[0].id;
    });
  await request
    .post('/api/graphql')
    .send({
      query: `{product (id: "${id}") { id, user, category, name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
      expect(res.body.data.product).toHaveLength(1);
    });
});

test('Fetch Product By User', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{product (user: "molly_member") { id, user, category, name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
    });
});

test('Fetch Product By Category', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{product (category: "toys") { id, user, category, name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
    });
});
