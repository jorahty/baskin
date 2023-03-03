import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconButton } from '@mui/joy';
// import { useTranslation } from 'next-i18next'

const Switcher = () => {
  const router = useRouter();
  const changeTo = router.locale === 'en' ? 'es' : 'en';
  return (
    <Link href="/" locale={changeTo}>
      <IconButton>{ changeTo }</IconButton>
    </Link>
  );
};

export default Switcher;