import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';
import requestHandler from '../requestHandler';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import * as login from '../login';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

const handlers = [
  login.loginHandlers,
  graphql.mutation('AddAttribute', async (req, res, ctx) => {
    return res(
      ctx.data({
        addAttribute: {
          category: 'shoes',
          name: 'Condition',
          type: 'set',
          values: ['new', 'old'],
          symbol: null,
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

test('Add attribute', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {addAttribute(input: {
        category: "shoes"
        name: "Condition"
        type: "set"
        values: ["new", "old"]
      }) 
      {
        category, name, type, values, symbol
      }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.addAttribute.name).toBeDefined();
      expect(data.body.data.addAttribute.name).toEqual('Condition');
      expect(data.body.data.addAttribute.category).toEqual('shoes');
      expect(data.body.data.addAttribute.type).toEqual('set');
      expect(data.body.data.addAttribute.symbol).toEqual(null);
      expect(data.body.data.addAttribute.values).toEqual(['new', 'old']);
    });
});