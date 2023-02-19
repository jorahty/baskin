import http from 'http';
import supertest from 'supertest';
import 'whatwg-fetch';

import * as db from './db';
import requestHandler from './requestHandler';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = http.createServer(requestHandler);
  server.listen();
  request = supertest(server);
  db.reset();
  return new Promise(resolve => setTimeout(resolve, 500));
});

afterAll(done => {
  server.close(done);
  db.shutdown();
});

test('Fetch messages by convo id anna and molly', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{
            message(id: "f94a1252-7d5e-4b87-ae41-7a03f58a4028" ){id}
          }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
    });
});

test('Fetch messages by convo id mia and nobby ', async () => {
  await request
    .post('/api/graphql')
    .send({
      query: `{
            message(id: "52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4" ){id}
          }`,
    })
    .expect(200)
    .then(res => {
      expect(res).toBeDefined();
    });
});
