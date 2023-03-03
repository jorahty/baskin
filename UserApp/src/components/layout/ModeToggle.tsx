import { IconButton, useColorScheme } from '@mui/joy';
import { useEffect, useState } from 'react';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

export default function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <IconButton disabled />;

  return (
    <IconButton
      variant="plain"
      color="neutral"
      aria-label="mode-toggle"
      onClick={() => (mode === 'light' ? setMode('dark') : setMode('light'))}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
