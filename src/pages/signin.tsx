import Router from 'next/router'
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';
import React from 'react';

export default function Signin() {
  const [user, setUser] = React.useState({email: '', password: ''});

  React.useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = {query: `query login{login(email: "${user.email}" password: "${user.password}") { name, accessToken }}`}
    fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.errors) {
          alert('Error logging in, please try again');
        } else {
          localStorage.setItem('user', JSON.stringify(json.data.login));
          Router.push({
            pathname: '/'
          })
        }
      })
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Input 
            onChange={handleInputChange}
            name="email"
            placeholder='Email address'
          />
          <Input 
            type="password"
            onChange={handleInputChange}
            name="password"
            placeholder="•••••••"
          />
          <Button
            type="submit"
            fullWidth
            variant="solid"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}