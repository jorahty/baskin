import app from './app';

const port = 4001;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
  console.log(`API Testing UI: http://localhost:${port}/api/v0/docs/`);
});
