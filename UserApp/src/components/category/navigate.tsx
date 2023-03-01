import { VerboseCategory } from '../../pages';
import { Card } from '@mui/joy';
import CategoryAncestors from './ancestors';
import CategoryChildren from './children';

interface Props {
  category: VerboseCategory;
}

export default function CategoryNavigate(
  { category: { ancestors, children, name } }: Props
) {
  return (
    <Card variant="outlined" sx={{ gap: 2 }}>
      {ancestors && <CategoryAncestors ancestors={ancestors} name={name} />}
      {children.length > 0 && <CategoryChildren subcategories={children} />}
    </Card>
  );
}
