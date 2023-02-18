import * as React from 'react';
import Router from 'next/router';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { useAppContext } from '../context';
import { IconButton } from '@mui/joy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface FormElements extends HTMLFormControlsCollection {
  firstname: HTMLInputElement;
  lastname: HTMLInputElement;
  email: HTMLInputElement;
  username: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

/**
 * This template uses [`Inter`](https://fonts.google.com/specimen/Inter?query=inter) font.
 */
export default function Signup() {
  const { signOut } = useAppContext();

  React.useEffect(() => {
    signOut();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (
    email: string,
    password: string,
    first: string,
    last: string,
    username: string
  ) => {
    const query = {
      query: `
        mutation addUser {
          addUser (input: {
            username: "${username}",
            email: "${email}",
            password: "${password}",
            name: "${first + ' ' + last}"
          }) 
          { name, email }
        }`,
    };

    fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.errors) {
          alert('Error signing up, please try again');
        } else {
          Router.push({
            pathname: '/signin',
          });
        }
      });
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <IconButton
        aria-label={'back'}
        onClick={() => { Router.push('/'); } }
        style={{ position: 'absolute', zIndex: 23, top: 15, left: 15 }}
      >
        <ArrowBackIcon />
      </IconButton>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
            '--Cover-width': '40vw', // must be `vw` only
            '--Form-maxWidth': '700px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={theme => ({
          width: 'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(255 255 255 / 0.6)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: 'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
            maxWidth: '100%',
            px: 2,
          }}
        >
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: 'hidden',
              },
            }}
          >
            <div>
              <Typography component="h2" fontSize="xl2" fontWeight="lg">
                Welcome
              </Typography>
              <Typography level="body2" sx={{ my: 1, mb: 3 }}>
                Let&apos;s get started! Please enter your details.
              </Typography>
            </div>
            <form
              onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  lastname: formElements.lastname.value,
                  firstname: formElements.firstname.value,
                  username: formElements.username.value,
                  email: formElements.email.value,
                  password: formElements.password.value,
                };
                handleSubmit(data.email, data.password, data.lastname, data.firstname, data.username);
              }}
            >
              <FormControl required>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="Enter your first name" type="firstname" name="firstname" />
              </FormControl>
              <FormControl required>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Enter your last name" type="lastname" name="lastname" />
              </FormControl>
              <FormControl required>
                <FormLabel>Username</FormLabel>
                <Input placeholder="Enter your username" type="username" name="username" />
              </FormControl>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter your email" type="email" name="email" />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input placeholder="•••••••" type="password" name="password" />
              </FormControl>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              ></Box>
              <Button type="submit" fullWidth aria-label="signup">
                Sign in
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
      <Box
        sx={theme => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage: 'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831)',
          },
        })}
      />
    </CssVarsProvider>
  );
}
