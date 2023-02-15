import supertest from 'supertest';

interface Member {
  username: string,
  password: string
}

export const molly = {
  username: 'molly_member',
  password: 'mollymember',
};

export const nobby = {
  username: 'nobby_nobody',
  password: 'nobbynobody',
};

async function login(request: supertest.SuperTest<supertest.Test>, member: Member): Promise<string> {
  let accessToken = "";
  await request.post('/api/graphql')
    .send({query: `{signin(username: "${member.username}" password: 
      "${member.password}") { accessToken }}`})
    .expect(200)
    .then((res) => {
      accessToken = res.body.data.signin.accessToken;
    });
  return accessToken;
}

export async function asMolly(request: supertest.SuperTest<supertest.Test>): Promise<string|undefined> {
  return login(request, molly);
}

export async function asNobby(request: supertest.SuperTest<supertest.Test>): Promise<string|undefined> {
  return login(request, nobby);
}