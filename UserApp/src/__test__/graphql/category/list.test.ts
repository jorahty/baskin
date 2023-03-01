import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';
import requestHandler from '../requestHandler';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  graphql.query('ListCategories', async (req, res, ctx) => {
    return res(
      ctx.data({
        category: [{
          slug: 'cars',
          name: 'Cars',
        }],
      }),
    );
  }),
  graphql.query('CategoryChildren', async (req, res, ctx) => {
    return res(
      ctx.data({
        categoryChildren: [{
          slug: 'cars',
          name: 'Cars',
        }],
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

test('List All', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{category { name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.category).toBeDefined();
    });
});

test('List by ID', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{category (slug: "apparel") { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.category).toHaveLength(1);
    });
});

test('List children', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{categoryChildren (slug: "vehicles") { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.categoryChildren).toBeDefined();
    });
});
