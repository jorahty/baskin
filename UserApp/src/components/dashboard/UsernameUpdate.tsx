import React from 'react';
import { Box, Button, Input, Typography } from '@mui/joy';
import ConfirmModal from './ConfirmModal';

interface Props {
  username: string;
  valid: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeUsername: () => void;
}

export default function UsernameUpdate(
  { username, valid, handleChange, changeUsername }: Props
) {
  const [open, setOpen] = React.useState(false);

  return (
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
          onClick={() => {
            if (username.length === 0 || !valid) {
              return;
            }
            setOpen(true);
          }}
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
      <ConfirmModal open={open} setOpen={setOpen} changeUsername={changeUsername} />
    </Box>
  );
}