import * as React from 'react';
import { Button, Sheet, Table, Typography, Avatar } from '@mui/joy';
import { Product } from '../../../graphql/product/schema';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useAppContext } from '../../../context';
import { GraphQLClient, gql } from 'graphql-request';

// Reference: https://codesandbox.io/s/6bmeke?file=/components/OrderTable.tsx:7018-12425
// Reference: https://mui.com/joy-ui/react-menu/

export default function ProductTable({ products }: { products: Product[] }) {
  const { signedInUser } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [product, setProduct] = React.useState('');
  const [productList, setProductList] = React.useState<Product[]>([]);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, product: string) => {
    setProduct(product);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = gql`mutation removeProduct {removeProduct (product: "${product}") { id }}`;
    await graphQLClient.request(query);
    setProductList(productList.filter(row => row.id != product));
  };

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
          {productList.map((row: Product) => (
            <tr key={row.id}>
              <td>
                <Avatar
                  src={`http://localhost:3012/${row.pictures[0]}.jpeg`}
                  alt={`Product image of ${row.name}`}
                  sx={{ borderRadius: 'sm', height: '100px', width: '100px' }}
                />
              </td>
              <td>
                <Typography fontWeight="md">{row.name}</Typography>
              </td>
              <td>{row.category}</td>
              <td>{row.price}</td>
              <td>
                <Button
                  variant="plain"
                  color="neutral"
                  aria-label="menu"
                  onClick={event => handleClick(event, row.id)}
                >
                  <MoreVertIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Menu
        id="positioned-demo-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-demo-button"
        placement="bottom-end"
      >
        <MenuItem onClick={handleClose} aria-label="edit">
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>{' '}
          Edit product
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={handleDelete} variant="soft" color="danger" aria-label="delete">
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <DeleteForever />
          </ListItemDecorator>{' '}
          Delete
        </MenuItem>
      </Menu>
    </Sheet>
  );
}
