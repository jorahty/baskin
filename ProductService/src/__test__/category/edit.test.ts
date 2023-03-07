import http from 'http';
import supertest from 'supertest';

import * as db from '../db';
import app from '../../app';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  await db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll(done => {
  server.close(done);
  db.shutdown();
});

test('Id category parent', async () => {
  await request
    .post('/graphql')
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

test('Id category name', async () => {
  await request
    .post('/graphql')
    .send({
      query: `
      mutation {
        editCategory(
          name: "Transporters"
          slug: "vehicles"
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
      expect(data.body.data.editCategory.name).toEqual('Transporters');
      expect(data.body.data.editCategory.slug).toEqual('transporters');
      expect(data.body.data.editCategory.parent).toEqual(null);
    });
});

test('Failed edit category with name or parent', async () => {
  await request
    .post('/graphql')
    .send({
      query: `
      mutation {
        editCategory(
          slug: "vehicles"
        ) 
        {
          name, slug, parent
        }
      }
    `,
    })
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});
