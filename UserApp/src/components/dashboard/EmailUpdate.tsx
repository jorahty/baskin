import React from 'react';
import { Box, Button, Input, Typography } from '@mui/joy';
import ConfirmModal from './ConfirmModal';

interface Props {
  email: string;
  valid: boolean;
  handleChange: (
    func: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  func: React.Dispatch<React.SetStateAction<string>>;
  changeEmail: () => void;

}

export default function EmailUpdate(
  { email, valid, handleChange, func, changeEmail }: Props
) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        mt: 5,
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'left',
      }}>
        <Input
          placeholder="Email"
          onChange={e => handleChange(func, e)}
          sx={{
            mr: 2,
            width: { md: '35vw', sm: '45vw', xs: '70vw' },
          }}
          value={email}
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
            if (email.length === 0 || !valid) {
              return;
            }
            setOpen(true);
          }}
        >
          Update Email
        </Button>
      </Box>
      {email.length > 0 &&
        <Typography
          color={valid ? 'success' : 'danger'}
          sx={{
            fontSize: '0.8rem',
            color: valid ? 'success' : 'error',
            mt: 1,
          }}>
          {valid ? 'Valid Email' : 'Invalid Email...'}
        </Typography>
      }
      <ConfirmModal input="email" open={open} setOpen={setOpen} changeFunc={changeEmail} />
    </Box>
  );
}