import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = 3011;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
  console.log(`API Testing UI: http://localhost:${port}/api/v0/docs/`);
});
