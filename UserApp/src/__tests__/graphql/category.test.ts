import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';
import requestHandler from './requestHandler';

// we need to test the app graphql api, by fetching then examining the response

// but the api will make fetch requests to the microservice, which we need to mock

// Test UserApp API at http://localhost:3000/api/graphql
let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

// Mock CategoryService at http://localhost:3013/graphql
import { rest } from 'msw';
import { setupServer } from 'msw/node';
const handlers = [
  rest.post('http://localhost:3013/graphql', (req, res, ctx) => {
    return res(ctx.json({
      data: {
        category: [{
          slug: 'vehicles',
          name: 'Vehicles',
        }, {
          slug: 'apparel',
          name: 'Apparel',
        }],
      },
    }));
  }),
];
const microServiceServer = setupServer(...handlers);

beforeAll(async () => {
  microServiceServer.listen();
  server = http.createServer(requestHandler);
  server.listen();
  request = supertest(server);
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterEach(() => microServiceServer.resetHandlers());

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
