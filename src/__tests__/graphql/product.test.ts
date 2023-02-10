import http from "http";
import supertest from "supertest";
import "whatwg-fetch";

import * as db from "./db";
import requestHandler from "./requestHandler";

let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  server = http.createServer(requestHandler);
  server.listen();
  request = supertest(server);
  db.reset();
  return new Promise((resolve) => setTimeout(resolve, 500));
});

afterAll((done) => {
  server.close(done);
  db.shutdown();
});

test("Fetch All Products", async () => {
  await request
    .post("/api/graphql")
    .send({
      query: `{product { id, mid, cid, title }}`,
    })
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data.product).toBeDefined();
      // don't want to check length or specific product in case we add more
    });
});
