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

test('Remove', async () => {
  await request
    .post('/graphql')
    .send({
      query: `
        mutation {
          removeAttribute(id: "X0bZdioM6D") {
            id
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
      expect(data.body.data.removeAttribute.id).toEqual('X0bZdioM6D');
    });
});

test('Remove Missing', async () => {
  await request
    .post('/graphql')
    .send({
      query: `
        mutation {
          removeAttribute(id: "X0bZdioM6D") {
            slug
          }
        }
      `,
    })
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data.body.errors.length).toEqual(1);
    });
});