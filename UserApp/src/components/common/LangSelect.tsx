import { useEffect, useState } from 'react';
import Router from 'next/router';
import { Select, Option } from '@mui/joy';
import TranslateIcon from '@mui/icons-material/Translate';

interface Props {
  localeG: string;
}

export default function LangSelect({ localeG }: Props) {
  const [locale, setLocale] = useState('en');

  const handleChange = (
    event: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    value: string | null,
  ) => {
    Router.push(Router.asPath, undefined, { locale: value as string });
    setLocale(value as string);
  };

  useEffect(() => {
    setLocale(localeG);
  }, [localeG]);

  return (
    <Select
      variant="plain"
      value={locale}
      onChange={handleChange}
      startDecorator={<TranslateIcon sx={{ fontSize: 'xl' }}/>}
    >
      <Option value="en">English</Option>
      <Option value="es">Español</Option>
      <Option value="fr">Français</Option>
      <Option value="pl">Polski</Option>
      <Option value="pt">Português</Option>
      <Option value="zh">中文</Option>
    </Select>
  );
}
