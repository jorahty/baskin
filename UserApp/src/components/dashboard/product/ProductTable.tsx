import { Button, Sheet, Table, Typography } from '@mui/joy';
import { Product } from '../../../graphql/product/schema';
import Image from 'next/image';

// Reference: https://codesandbox.io/s/6bmeke?file=/components/OrderTable.tsx:7018-12425

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <Sheet
      className="OrderTableContainer"
      variant="outlined"
      sx={{
        width: '100%',
        borderRadius: 'md',
        flex: 1,
        overflow: 'auto',
        minHeight: 0,
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
            <th style={{ width: 140, padding: 12 }}>Image</th>
            <th style={{ width: 220, padding: 12 }}>Product</th>
            <th style={{ width: 160, padding: 12 }}>Category</th>
            <th style={{ width: 120, padding: 12 }}>Price</th>
            <th style={{ width: 100, padding: 12 }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((row: Product) => (
            <tr key={row.id}>
              <td>
                <Image
                  src={row.pictures[0]}
                  alt={`Product image of ${row.name}`}
                  width={100}
                  height={100}
                />
              </td>
              <td>
                <Typography fontWeight="md">{row.name}</Typography>
              </td>
              <td>{row.category}</td>
              <td>{row.price}</td>
              <td>
                <Button>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
