import { VerboseCategory } from '../../pages';
import { Card, Chip, Stack } from '@mui/joy';
import Link from 'next/link';

interface Props {
  category: VerboseCategory;
}

export default function CategoryNavigate({ category }: Props) {
  return (
    <Card variant="outlined">
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {category.children.map(child => (
          <Link key={child.slug} href={`/category/${child.slug}`}>
            <Chip sx={{ color: 'text.primary', bgcolor: 'neutral.softBg' }}>
              {child.name}
            </Chip>
          </Link>
        ))}
      </Stack>
    </Card>
  );
}
