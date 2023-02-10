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

const id = "af956320-a052-11ed-a8fc-0242ac130000";
const mid = "af956320-a052-11ed-a8fc-0242ac120001";
const cid = "af956320-a052-11ed-a8fc-0242ac140002";

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
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
      // don't want to check length or specific product in case we add more
    });
});

test("Fetch Product By ID", async () => {
  await request
    .post("/api/graphql")
    .send({
      query: `{product (id: "${id}") { id, mid, cid, title }}`,
    })
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
      expect(res.body.data.product).toHaveLength(1);
    });
});

test("Fetch Product By Member ID", async () => {
  await request
    .post("/api/graphql")
    .send({
      query: `{product (mid: "${mid}") { id, mid, cid, title }}`,
    })
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
    });
});

test("Fetch Product By Category ID", async () => {
  await request
    .post("/api/graphql")
    .send({
      query: `{product (cid: "${cid}") { id, mid, cid, title }}`,
    })
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.product).toBeDefined();
    });
});
