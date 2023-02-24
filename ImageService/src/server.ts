import app from './app';

const port = 3012;

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
