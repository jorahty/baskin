import Link from 'next/link';
import { Stack, Typography } from '@mui/joy';
import { useTranslation } from 'next-i18next';

export const footerHeight = '50px';

export default function Footer() {
  const { t } = useTranslation('common');
  return (
    <Stack
      height={footerHeight}
      direction="row"
      alignItems="center"
      justifyContent="center"
      p={2}
    >
      <Typography>© {t('common.footer.baskin')}</Typography>
      <Typography>
          &nbsp;• <Link href={'/terms'}>{t('common.footer.terms')}</Link>
      </Typography>
      <Typography>
          &nbsp;• <Link href={'/guidelines'}>{t('common.footer.guidelines')}</Link>
      </Typography>
      <Typography>
          &nbsp;• <Link href={'/about'}>{t('common.footer.about')}</Link>
      </Typography>
      {/* {[
        'Terms',
        'Guidelines',
        'About',
      ].map(page => (
        <Typography key={page}>
          &nbsp;• <Link href={`/${page.toLowerCase()}`}>{page}</Link>
        </Typography>
      ))} */}
    </Stack>
  );
}
