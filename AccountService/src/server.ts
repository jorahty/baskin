import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = 4000;

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
  console.log(`Running a GraphQL Playground at http://localhost:${port}/playground`);
});
