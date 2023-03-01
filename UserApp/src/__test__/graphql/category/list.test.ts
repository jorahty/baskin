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
      query: `query category{category { name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.category).toBeDefined();
    });
});
