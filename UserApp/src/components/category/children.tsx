import { Chip, Stack } from '@mui/joy';
import Link from 'next/link';
import { Category } from '@/graphql/category/schema';

interface Props {
  subcategories: Category[];
}

export default function CategoryChildren({ subcategories }: Props) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {subcategories.map(child => (
        <Link key={child.slug} href={`/category/${child.slug}`}>
          <Chip sx={{ color: 'text.primary', bgcolor: 'neutral.softBg' }}>
            {child.name}
          </Chip>
        </Link>
      ))}
    </Stack>
  );
}
