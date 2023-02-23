import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/joy';
import { useState } from 'react';
import { useAppContext } from '../../context';
import { GraphQLClient } from 'graphql-request';
import { regexUsername, regexEmail } from '../../graphql/regex';
import UsernameUpdate from './UsernameUpdate';
import Router from 'next/router';
import EmailUpdate from './EmailUpdate';


export default function ProfileEdit() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const { signedInUser, signOut } = useAppContext();

  const handleChange = (
    func: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    func(event.target.value);
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

  const changeEmail = async () => {
    const accessToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const query = `mutation updateEmail { updateEmail(newEmail: "${email}") { email } }`;
    await graphQLClient.request(query);
    if (signedInUser) {
      signOut();
      Router.push({
        pathname: '/signin',
      });
    }
    setEmail('');
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
            setValidUsername(true);
          } else {
            setValidUsername(false);
          }
        } else {
          setValidUsername(false);
        }
      }
    };
    fetchData();
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchData = async () => {
      if (!signedInUser) {
        return;
      } else {
        let data;
        if (regexEmail.test(email)) {
          const accessToken = signedInUser?.accessToken;
          const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const query = `query user { user(email: "${email}") { username } }`;
          data = await graphQLClient.request(query);
          if (data?.user?.length === 0) {
            setValidEmail(true);
          } else {
            setValidEmail(false);
          }
        } else {
          setValidEmail(false);
        }
      }
    };
    fetchData();
  }, [email]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m: 2,
      }}>
        <UsernameUpdate
          username={username}
          valid={validUsername}
          handleChange={handleChange}
          func={setUsername}
          changeUsername={changeUsername}
        />
        <EmailUpdate
          email={email}
          valid={validEmail}
          handleChange={handleChange}
          func={setEmail}
          changeEmail={changeEmail}
        />
      </Box>
    </Box>
  );
}