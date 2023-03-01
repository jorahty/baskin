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

export const anna = {
  username: 'anna_admin',
  password: 'annaadmin',
};

const nobby = {
  username: 'nobby_nobody',
  password: 'nobbynobody',
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

export async function asMolly(
  request: supertest.SuperTest<supertest.Test>
): Promise<string | undefined> {
  return login(request, molly);
}

export async function asNobby(
  request: supertest.SuperTest<supertest.Test>
): Promise<string | undefined> {
  return login(request, nobby);
}


export const loginHandlers = (graphql.query('GetUser', async (req, res, ctx) => {
  const json = await req.json();
  if (json.query.indexOf('molly_member') >= 0) {
    return res(
      ctx.data({
        user: [{
          username: 'molly_member',
          name: 'Molly Member',
          password: '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y',
          roles: ['member'],
        }],
      }),
    );
  } else if (json.query.indexOf('nobby_nobod') >= 0){
    return res(
      ctx.data({
        user: [{
          username: 'nobby_nobody',
          name: 'nobby nobody',
          password: '$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm',
          roles: [],
        }],
      }),
    );
  }
}));