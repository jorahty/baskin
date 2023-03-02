import supertest from 'supertest';
import { graphql } from 'msw';

interface Member {
  username: string;
  password: string;
}

export const molly = {
  username: 'molly_member',
  password: 'mollymember',
};

const anna = {
  username: 'anna_admin',
  password: 'annaadmin',
};


async function login(
  request: supertest.SuperTest<supertest.Test>, member: Member
): Promise<string> {
  let accessToken = '';
  await request
    .post('/api/graphql')
    .send({
      query: `query signin {signin(username: "${member.username}" password: 
      "${member.password}") { username, accessToken }}`,
    })
    .expect(200)
    .then(res => {
      accessToken = res.body.data.signin.accessToken;
    });
  return accessToken;
}

export async function asAnna(
  request: supertest.SuperTest<supertest.Test>
): Promise<string | undefined> {
  return login(request, anna);
}

export const loginHandlers = (graphql.query('GetUser', async (req, res, ctx) => {
  const json = await req.json();
  if (json.query.indexOf('anna_admin') >= 0){
    return res(
      ctx.data({
        user: [{
          username: 'anna_admin',
          name: 'anna admin',
          password: '$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze',
          roles: ['admin', 'moderator', 'member'],
        }],
      }),
    );
  }
}));