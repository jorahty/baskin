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

test('List All', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{category { name }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.category).toBeDefined();
    });
});

test('List by ID', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{category (slug: "apparel") { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.category).toHaveLength(1);
    });
});

test('List children', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{categoryChildren (slug: "vehicles") { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.categoryChildren).toBeDefined();
    });
});

test('List roots', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{categoryChildren { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.categoryChildren).toBeDefined();
    });
});


test('List children', async () => {
  await request
    .post('/graphql')
    .send({
      query: `{categoryAncestors (slug: "sailboats") { name, slug }}`,
    })
    .expect(200)
    .then(res => {
      expect(res.body.data.categoryAncestors).toBeDefined();
    });
});


test('Add category', async () =>{
  await request
  .post('/graphql')
  .send({
    query: `
      mutation {
        addCategory( input: {
          name: "New"
          slug: "new"
        }) 
        {
          name, slug, parent
        }
      }
    `,
  })

  .expect('Content-Type', /json/)
  .then(data => {
    expect(data).toBeDefined();
    expect(data.body).toBeDefined();
    expect(data.body.data).toBeDefined();
    expect(data.body.data.addCategory.name).toBeDefined();
    expect(data.body.data.addCategory.name).toEqual('New');
    expect(data.body.data.addCategory.slug).toEqual('new');
    expect(data.body.data.addCategory.parent).toEqual(null);
  });
})

test('Add subcategory', async () =>{
  await request
  .post('/graphql')
  .send({
    query: `
      mutation {
        addCategory( input: {
          name: "Soccer"
          slug: "soccer"
          parent: "sports"
        }) 
        {
          name, slug, parent
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
    expect(data.body.data.addCategory.name).toBeDefined();
    expect(data.body.data.addCategory.name).toEqual('Soccer');
    expect(data.body.data.addCategory.slug).toEqual('soccer');
    expect(data.body.data.addCategory.parent).toEqual('sports');
  });
})
