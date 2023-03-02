import * as React from 'react';
import { Sheet, Table, Typography } from '@mui/joy';
import { Category } from '../../graphql/category/schema';


// Reference: https://codesandbox.io/s/6bmeke?file=/components/OrderTable.tsx:7018-12425
// Reference: https://mui.com/joy-ui/react-menu/

export default function CategoryTable({ categories }: { categories: Category[] }) {
  const [categoryList, setCategoryList] = React.useState<Category[]>([]);

  React.useEffect(() => {
    setCategoryList(categories);
  }, [categories]);

  return (
    <Sheet
      className="OrderTableContainer"
      variant="outlined"
      sx={{
        width: '100%',
        borderRadius: 'md',
        flex: 1,
        overflow: 'auto',
        height: '75vh',
        margin: '20px 0',
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={{
          '--TableCell-headBackground': theme => theme.vars.palette.background.level1,
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': theme => theme.vars.palette.background.level1,
        }}
      >
        <thead>
          <tr>
            <th style={{ width: '50%', padding: 12 }}>Name</th>
            <th style={{ width: '50%', padding: 12 }}>Parent</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((row: Category) => (
            <tr key={row.slug} aria-label={row.slug}>
              <td>
                <Typography fontWeight="md">{row.name}</Typography>
              </td>
              <td>
                <Typography fontWeight="md">{row.parent ?
                  row.parent[0].toUpperCase() + row.parent.slice(1) : 'None'}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
