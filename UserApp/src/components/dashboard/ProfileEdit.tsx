import React, { useEffect } from 'react';
import { Box, Button, Input, Typography } from '@mui/joy';
import { useState } from 'react';
import { useAppContext } from '../../context';
import { GraphQLClient } from 'graphql-request';
import { regexUsername } from '../../graphql/regex';


export default function ProfileEdit() {
  const [username, setUsername] = useState('');
  const [valid, setValid] = useState(false);

  const { signedInUser, setSignedInUser } = useAppContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const changeUsername = async () => {
    const accessToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const query = `mutation updateUsername { updateUsername(newName: "${username}") { username } }`;
    const data = await graphQLClient.request(query);
    if (signedInUser) {
      signedInUser.username = data.updateUsername.username;
    }
    setSignedInUser(signedInUser);
  };


  useEffect(() => {
    const fetchData = async () => {
      if (!signedInUser) {
        return;
      } else {
        let data;
        if (regexUsername.test(username)) {
          const accessToken = signedInUser?.accessToken;
          const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const query = `query user { user(username: "${username}") { username } }`;
          data = await graphQLClient.request(query);
          if (data?.user?.length === 0) {
            setValid(true);
          } else {
            setValid(false);
          }
        } else {
          setValid(false);
        }
      }
    };
    fetchData();
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m: 2,
      }}>
      <Typography
        component="h1"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'primary',
          mb: 4,
        }}
      >
        Profile Settings
      </Typography>
      <Box
        component="form"
        noValidate 
        autoComplete="off"
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'left',
        }}>
          <Input
            placeholder="Username"
            onChange={handleChange}
            sx={{
              mr: 2,
              width: { md: '35vw', sm: '45vw', xs: '70vw' },        
            }}
            value={username}
          />
          <Button
            variant="solid"
            sx={{
              backgroundColor: 'primary',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary',
                color: 'white',
              },
            }}
            onClick={changeUsername}
          >
            Update
          </Button>
        </Box>
        {username.length > 0 &&
          <Typography 
            color={valid ? 'success' : 'danger'}
            sx={{
              fontSize: '0.8rem',
              color: valid ? 'success' : 'error',
              mt: 1,
            }}>
            {valid ? 'Valid Username' : 'Invalid Username...'}
          </Typography>
        }
      </Box>
    </Box>
  );
}