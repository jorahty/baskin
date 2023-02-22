import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/joy';
import { useState } from 'react';
import { useAppContext } from '../../context';
import { GraphQLClient } from 'graphql-request';
import { regexUsername } from '../../graphql/regex';
import UsernameUpdate from './UsernameUpdate';
import Router from 'next/router';


export default function ProfileEdit() {
  const [username, setUsername] = useState('');
  const [valid, setValid] = useState(false);

  const { signedInUser, signOut } = useAppContext();

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
      const temp = signedInUser;
      temp.username = data.updateUsername.username;
      signOut();
      Router.push({
        pathname: '/signin',
      });
    }
    setUsername('');
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
      <UsernameUpdate
        username={username}
        valid={valid}
        handleChange={handleChange}
        changeUsername={changeUsername}
      />
    </Box>
  );
}