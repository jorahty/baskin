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
  graphql.query('CategoryAncestors', async (req, res, ctx) => {
    return res(
      ctx.data({
        categoryAncestors: [{
          slug: 'cars',
          name: 'Cars',
        }],
      }),
    );
  }),
  graphql.mutation('AddCategory', async (req, res, ctx) => {
    return res(
      ctx.data({
        addCategory: {
          slug: 'new',
          name: 'New',
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

test('No header', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{category { name }}`,
    })
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});

test('Corrupt header', async () => {
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + 'garbage')
    .send({
      query: `{category { name }}`,
    })
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});


test('List All', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{category { name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.category).toBeDefined();
    });
});

test('List by ID', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{category (slug: "apparel") { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.category).toHaveLength(1);
    });
});

test('List children', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{categoryChildren (slug: "vehicles") { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.categoryChildren).toBeDefined();
    });
});

test('List ancestors', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `{categoryAncestors (slug: "vehicles") { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.categoryAncestors).toBeDefined();
    });
});

test('Add cateogry', async () => {
  const accessToken = await login.asAnna(request);
  await request
    .post('/api/graphql')
    .set('Authorization', 'Bearer ' + accessToken)
    .send({
      query: `mutation {addCategory(input:
          {slug: "new", name: "New", parent: "vehicle"})
        { name, slug }}`,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.addCategory.name).toEqual('New');
      expect(data.body.data.addCategory.slug).toEqual('new');
    });
});
