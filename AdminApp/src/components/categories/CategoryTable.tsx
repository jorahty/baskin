import * as React from 'react';
import { Sheet, Table, Typography } from '@mui/joy';
import { Category } from '../../graphql/category/schema';
import Box from '@mui/joy/Box';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Button } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import Delete from '@mui/icons-material/Delete';
import { useAppContext } from '../../context';
import { gql, GraphQLClient } from 'graphql-request';

// Reference: https://codesandbox.io/s/6bmeke?file=/components/OrderTable.tsx:7018-12425
// Reference: https://mui.com/joy-ui/react-menu/

export default function CategoryTable({ categories, setCategories }:
  { categories: Category[], setCategories: React.Dispatch<React.SetStateAction<Category[]>>}) {
  const { signedInUser } = useAppContext();
  const [categoryList, setCategoryList] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');

  const handleOpen = (slug: string) => {
    setOpen(true);
    setCategory(slug);
  };

  const handleClose = () => {
    setOpen(false);
    setCategory('');
  };

  const handleDelete = async () => {
    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = gql`
        mutation removeCategory {
          removeCategory (
            slug: "${category}"
          ) {slug}
        }
    `;

    await graphQLClient
      .request(query)
      .then(() => {
        setOpen(false);
        setCategory('');
        setCategories([]);
      })
      .catch(() => alert('Error deleting category, Try again'));
  };

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
            <th style={{ width: '45%', padding: 12 }}>Parent</th>
            <th
              aria-label="last"
              style={{ width: 'var(--Table-lastColumnWidth)' }}
            />
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
              <td>
                <IconButton aria-label={'delete-'+row.slug}
                  size="sm" color="danger" onClick={() => handleOpen(row.slug)}>
                  <Delete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal open={open} onClose={handleClose}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
            Are you sure you want to discard delete this category?
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="solid" color="danger"
              aria-label="delete" onClick={handleDelete}>
              Delete Category
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
}
