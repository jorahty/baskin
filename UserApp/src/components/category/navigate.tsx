import { VerboseCategory } from '../../pages';
import { Breadcrumbs, Card, Chip, Link as JoyLink, Stack, Typography } from '@mui/joy';
import Link from 'next/link';

interface Props {
  category: VerboseCategory;
}

export default function CategoryNavigate({ category }: Props) {
  const breadcrumbs = category.ancestors &&
  [{ url: '/', name: 'All' }, ...category.ancestors.map((
    { slug, name }) => ({ url: `/category/${slug}`, name }))];

  return (
    <Card variant="outlined" sx={{ gap: 2 }}>
      {category.ancestors &&
        <Breadcrumbs sx ={{ p: 0, border: '1px solid #00000000' }}>
          {breadcrumbs?.map(({ url, name }, index) => (
            <Link key={index} href={url} passHref>
              <JoyLink
                color="neutral"
              >
                {name}
              </JoyLink>
            </Link>
          ))}
          <Typography fontSize="inherit">{category.name}</Typography>
        </Breadcrumbs>
      }
      {category.children.length > 0 &&
        <Stack direction="row" flexWrap="wrap" gap={1} border="1px solid #00000000">
          {category.children.map(child => (
            <Link key={child.slug} href={`/category/${child.slug}`}>
              <Chip sx={{ color: 'text.primary', bgcolor: 'neutral.softBg' }}>
                {child.name}
              </Chip>
            </Link>
          ))}
        </Stack>
      }
    </Card>
  );
}
