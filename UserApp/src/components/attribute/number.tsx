import { Attribute } from '@/graphql/category/schema';
import { Box } from '@mui/joy';

interface Props {
  attribute: Attribute;
}

export default function AttributeNumber({ attribute }: Props) {
  return (
    <Box>{attribute.name}</Box>
  );
}
