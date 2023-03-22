// import http from 'http'
// import supertest from 'supertest';
// import 'whatwg-fetch'
//
// import * as login from '../login';
// import requestHandler from './requestHandler'
//
// let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
// let request: supertest.SuperTest<supertest.Test>
//
// beforeAll( async () => {
//   server = http.createServer(requestHandler);
//   server.listen();
//   request = supertest(server)
// });
//
// afterAll((done) => {
//   server.close(done);
// });
//
// test('GET Invalid URL', async () => {
//   const response = await fetch('http://localhost:3000/api/so-not-a-real-end-point-ba-bip-de-doo-da/');
//   expect(response.status).toEqual(404);
// });
