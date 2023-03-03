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
  graphql.mutation('EditCategory', async (req, res, ctx) => {
    return res(
      ctx.data({
        editCategory: {
          slug: 'trucks',
          name: 'Trucks',
          parent: 'property',
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

test('Edit category parent', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `
      mutation {
        editCategory(
          parent: "property"
          slug: "trucks"
        ) 
        {
          name, slug, parent
        }
      }
    `,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.editCategory.name).toBeDefined();
      expect(data.body.data.editCategory.name).toEqual('Trucks');
      expect(data.body.data.editCategory.slug).toEqual('trucks');
      expect(data.body.data.editCategory.parent).toEqual('property');
    });
});