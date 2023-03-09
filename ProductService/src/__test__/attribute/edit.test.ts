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


test('edit attribute', async () => {
  await request
    .post('/graphql')
    .send({
      query: `
      mutation {
        editAttribute( input: {
          id: "X0bZdioM6D"
          name: "Condition"
          category: "vehicles"
          type: "set"
          values: ["new", "old"]
        }) 
        {
          category, name, type, values, symbol
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
      expect(data.body.data.editAttribute.name).toBeDefined();
      expect(data.body.data.editAttribute.name).toEqual('Condition');
      expect(data.body.data.editAttribute.category).toEqual('vehicles');
      expect(data.body.data.editAttribute.type).toEqual('set');
      expect(data.body.data.editAttribute.symbol).toEqual(null);
      expect(data.body.data.editAttribute.values).toEqual(['new', 'old']);
    });
});