import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = 3014;

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
  console.log(`Running a GraphQL Playground at http://localhost:${port}/playground`);
});
