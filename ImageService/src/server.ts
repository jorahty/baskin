import app from './app';

const port = 3012;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
  console.log(`API Testing UI: http://localhost:${port}/image`);
});
