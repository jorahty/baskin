import { Breadcrumbs, Link as JoyLink, Typography } from '@mui/joy';
import Link from 'next/link';
import { Category } from '@/graphql/category/schema';

interface Props {
  name: null|string;
  ancestors: Category[];
}

export default function CategoryAncestors({ ancestors, name }: Props) {
  const breadcrumbs = [{ url: '/', name: 'All' }, ...ancestors.map(
    ({ slug, name }) => ({ url: `/category/${slug}`, name })
  )];

  return (
    <Breadcrumbs sx ={{ p: 0 }}>
      {breadcrumbs.map(({ url, name }, index) => (
        <Link key={index} href={url} passHref>
          <Typography color="neutral">
            {name}
          </Typography>
        </Link>
      ))}
      <Typography fontSize="inherit">{name}</Typography>
    </Breadcrumbs>
  );
}
