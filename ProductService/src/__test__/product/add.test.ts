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

test('Add Product', async () => {
  await request
    .post('/graphql')
    .send({
      query: `
        mutation {
          addProduct(
            input: {
              user: "molly_member"
              category: "clothing"
              name: "Toy robot"
              price: 40.99
              discount: 0
              quantity: 1
              description: "brand new"
              pictures: ["123"]
            }
          ) {
            id, user, category, name, price, discount,
            quantity, description, pictures, date
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
      expect(data.body.data.addProduct.name).toBeDefined();
      expect(data.body.data.addProduct.name).toEqual('Toy robot');
      expect(data.body.data.addProduct.description).toEqual('brand new');
      expect(data.body.data.addProduct.user).toEqual('molly_member');
      console.log(data.body.data.addProduct);
    });
});
