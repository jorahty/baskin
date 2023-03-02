import { Button, Stack, Typography } from '@mui/joy';
// import Router, { useRouter } from 'next/router';
// import { Category } from '../../graphql/category/schema';
// import Logo from './Logo';
// import { useTranslation } from 'next-i18next';
import { VerboseCategory } from '../../pages';
// import { Button, Stack, Typography } from '@mui/joy';
import Link from 'next/link';

export interface Props {
  category: VerboseCategory;
}

export default function Sidebar({ category }: Props) {
  // const router = useRouter();
  // const { query } = router;
  // const { t } = useTranslation('common');

  return (
    <Stack p={2} width="100%" gap={2}>
      <Link href="/product/create">
        <Button fullWidth>Sell new product</Button>
      </Link>
      {category.name &&
        <Typography level="h3" fontWeight={800}>
          {category.name}
        </Typography>
      }
      <Typography>
        Category-specific attributes will go here
      </Typography>
    </Stack>
  );
}
