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


test('Add attribute', async () => {
  await request
    .post('/graphql')
    .send({
      query: `
      mutation {
        addAttribute( input: {
          category: "shoes"
          name: "Condition"
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
      expect(data.body.data.addAttribute.name).toBeDefined();
      expect(data.body.data.addAttribute.name).toEqual('Condition');
      expect(data.body.data.addAttribute.category).toEqual('shoes');
      expect(data.body.data.addAttribute.type).toEqual('set');
      expect(data.body.data.addAttribute.symbol).toEqual(null);
      expect(data.body.data.addAttribute.values).toEqual(['new', 'old']);
    });
});
