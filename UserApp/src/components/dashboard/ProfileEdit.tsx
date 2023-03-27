import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/joy';
import { useState } from 'react';
import { useAppContext } from '../../context';
import { GraphQLClient } from 'graphql-request';
import { regexUsername } from '../../graphql/regex';
import UsernameUpdate from './UsernameUpdate';
import Router from 'next/router';
// import EmailUpdate from './EmailUpdate';
import { useTranslation } from 'next-i18next';


export default function ProfileEdit() {
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  // const [validEmail, setValidEmail] = useState(false);

  const { signedInUser, signOut } = useAppContext();
  const { t } = useTranslation('common');

  const handleChange = (
    func: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    func(event.target.value);
  };

  const changeUsername = async () => {
    const accessToken = signedInUser?.accessToken;
    const url = window.location.protocol + '//' + window.location.host;
    const graphQLClient = new GraphQLClient(url +'/api/graphql', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const query = `mutation updateUsername { updateUsername(newName: "${username}") { username } }`;
    const data:{updateUsername: {username:string}} = await graphQLClient.request(query);
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
        let data:{user: string};
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
  }, [username]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
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
        aria-label="Profile Settings"
      >
        {t('dashboard.profileSettings.title')}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'left',
      }}>
        <UsernameUpdate
          username={username}
          valid={validUsername}
          handleChange={handleChange}
          func={setUsername}
          changeUsername={changeUsername}
        />
        {/* <EmailUpdate
          email={email}
          valid={validEmail}
          handleChange={handleChange}
          func={setEmail}
          changeEmail={changeEmail}
        /> */}
      </Box>
    </Box>
  );
}