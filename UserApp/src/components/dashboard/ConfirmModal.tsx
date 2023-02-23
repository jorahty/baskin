import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/joy';

interface Props {
  input: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  changeFunc: () => void;
}

export default function ConfirmModal({ input, open, setOpen, changeFunc }: Props) {

  return (
    <Modal
      open={open}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <h2>Are you sure?</h2>
        <Typography
          sx={{
            fontSize: '1.2rem',
            mb: 2,
          }}>
          Changing your {input} requires you to sign in again.
        </Typography>
        <Button
          sx={{
            m: 2,
          }}
          onClick={() => {
            setOpen(false);
            changeFunc();
          }}
        >
          Update and Sign Out
        </Button>
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
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>

      </Box>
    </Modal>
  );
}
