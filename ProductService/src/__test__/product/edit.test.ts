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

test('Edit', async () => {
  await request
    .post('/graphql')
    .send({
      query: `
        mutation updateProduct{
          updateProduct(
            id:"46fd42cf-e976-48a0-9ac2-d97a96e885eb",
          input:{
            user:"molly_member",
            name:"Some Cowboy Hat",
            price:255.0,
            discount:0,
            description:"Updated!",
            category:"apparel",
            quantity:2,
            images:["bd4e0f00-5494-4d27-ba4f-2b27baaf19a7"]
          }){id}
        }
      `,
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(data => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.data).toBeDefined();
      expect(data.body.data.updateProduct.id).toEqual('46fd42cf-e976-48a0-9ac2-d97a96e885eb');
    });
});

test('Edit - Does not exist', async () => {
  await request
    .post('/graphql')
    .send({
      query: `
        mutation updateProduct{
          updateProduct(
            id:"46fd42cf-e974-48a0-9ac2-d97a96e885eb",
          input:{
            user:"molly_member",
            name:"Some Cowboy Hat",
            price:255.0,
            discount:0,
            description:"Not updated",
            category:"apparel",
            quantity:2,
            images:["bd4e0f00-5494-4d27-ba4f-2b27baaf19a7"]
          }){id}
        }
      `,
    })
    .expect(500);
});
