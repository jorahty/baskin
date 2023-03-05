import { rest } from 'msw';


const URL = 'http://localhost:4000/graphql';
const handlers = [
  rest.post(URL, async (req, res, ctx) => {
    const json = await req.json();
    if (json.query.indexOf('molly_member') >= 0) {
      return res(
        ctx.json({ data: {
          user: {
            username: 'molly_member',
            name: 'Molly Member',
            password: '$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y',
            roles: ['member'],
          },
        } }),
      );
    } else {
      return res(
        ctx.json({ data: {
          user: {
            username: 'nobby_nobody',
            name: 'nobby nobody',
            password: '$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm',
            roles: [],
          },
        } }),
      );
    }
  }),
];

const accountServiceHandler = handlers;

export default accountServiceHandler;
