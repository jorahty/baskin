import Router from 'next/router'
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { Stack } from '@mui/joy';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Signin() {
  const [credentials, setCredentials] = useState({email: '', password: ''});

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const handleInputChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const name = target.name as "email"|"password";
    const u = credentials;
    u[name] = target.value;
    setCredentials(u);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = {query: `query login{login(email: "${credentials.email}" password: "${credentials.password}") { name, accessToken }}`}
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
    <Stack component="form" onSubmit={handleSubmit}
      sx={{
        margin: '100px auto',
        alignItems: 'center',
        width: 300,
        gap: 2,
      }}
    >
      <Typography component="h2" fontSize="xl2" fontWeight="lg">
        Sign in
      </Typography>
      <Input 
        fullWidth
        onChange={handleInputChange}
        name="email"
        placeholder='Email address'
      />
      <Input
        fullWidth
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
    </Stack>
  );
}