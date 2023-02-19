/*
#######################################################################
#
# Copyright (C) 2022-2023 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import supertest from 'supertest'
import * as http from 'http'

// Must be ths way round 
import * as db from './db'
import app from '../app'

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
let request: supertest.SuperTest<supertest.Test>

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  await db.reset();
})

afterAll(async () => {
  server.close();
  await db.shutdown(); 
})

const bad = {
  account: 'molly',
  password: 'notmollyspassword',
}

const molly = {
  "account": "molly",
  "password": "mollymember"
}

test('Good Credentials', async () => {
  await request.post('/api/v0/account')
    .send(molly)
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined()
      expect(res.body).toBeDefined()
      expect(res.body.id).toBeDefined()
      expect(res.body.account).toEqual('molly')
      expect(res.body.email).toEqual('molly@books.com')
      expect(res.body.name).toEqual('Molly Member')
      expect(res.body.role).toEqual('member')
    });
});

test('Bad Credentials', async () => {
  await request.post('/api/v0/account')
    .send(bad)
    .expect(404)
});

test('API Docs', async () => {
  await request.get('/api/v0/docs/')
    .expect(200);
});
