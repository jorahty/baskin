import React from 'react';
import { Box, Button, Input, Typography } from '@mui/joy';
import ConfirmModal from './ConfirmModal';
import { useTranslation } from 'next-i18next';

interface Props {
  username: string;
  valid: boolean;
  handleChange: (
    func: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  func: React.Dispatch<React.SetStateAction<string>>;
  changeUsername: () => void;
}

export default function UsernameUpdate(
  { username, valid, handleChange, func, changeUsername }: Props
) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation('common');

  const usernamePlaceholder = t('dashboard.profileSettings.form.username');
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
          placeholder={usernamePlaceholder}
          onChange={e => handleChange(func, e)}
          sx={{
            mr: 2,
            width: { md: '35vw', sm: '45vw', xs: '50vw' },
          }}
          value={username}
          aria-label="Username"
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
            width: { md: '20vw', sm: '25vw', xs: '35vw' },
          }}
          onClick={() => {
            if (username.length === 0 || !valid) {
              return;
            }
            setOpen(true);
          }}
          aria-label="Update Username"
        >
          {t('dashboard.profileSettings.form.updateUser')}
        </Button>
      </Box>
      {username.length > 0 &&
        <Typography
          color={valid ? 'success' : 'danger'}
          sx={{
            fontSize: '0.8rem',
            color: valid ? 'success' : 'error',
            mt: 1,
          }}
          aria-label={valid ? 'Valid Username' : 'Invalid Username...'}
        >
          {valid ? 'Valid Username' : 'Invalid Username...'}
        </Typography>
      }
      <ConfirmModal input="username" open={open} setOpen={setOpen} changeFunc={changeUsername} />
    </Box>
  );
}