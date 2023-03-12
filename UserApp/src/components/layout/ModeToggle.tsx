import { IconButton, Tooltip, useColorScheme } from '@mui/joy';
import { useEffect, useState } from 'react';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';

export default function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <IconButton disabled />;

  return (
    <Tooltip
      title={`Turn ${mode === 'light' ? 'off' : 'on'} the light`}
      placement="bottom-start"
    >
      <IconButton
        variant="plain"
        color="neutral"
        aria-label="mode-toggle"
        onClick={() => (mode === 'light' ? setMode('dark') : setMode('light'))}
      >
        {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </Tooltip>
  );
}
