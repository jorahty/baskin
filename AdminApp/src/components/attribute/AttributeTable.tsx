import * as React from 'react';
import { Attribute } from '../../graphql/attribute/schema';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Delete from '@mui/icons-material/Delete';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Button from '@mui/joy/Button';
import { useAppContext } from '../../context';
import { gql, GraphQLClient } from 'graphql-request';
import EditIcon from '@mui/icons-material/Edit';
import EditAttributeModal from './EditAttributeModal';

// Reference: https://codesandbox.io/s/6bmeke?file=/components/OrderTable.tsx:7018-12425
// Reference: https://mui.com/joy-ui/react-menu/

export default function AttributeTable({ attributes, setAttributes }:
  { attributes: Attribute[], setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>}) {
  const { signedInUser } = useAppContext();
  const [attributeList, setAttributeList] = React.useState<Attribute[]>([]);
  const [currentAttribute, setCurrentAttribute] = React.useState<Attribute>();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [attribute, setAttribute] = React.useState('');

  const handleOpen = (id: string) => {
    setOpen(true);
    setAttribute(id);
  };

  const handleClose = () => {
    setOpen(false);
    setAttribute('');
  };

  const handleEdit = (attribute: Attribute) => {
    setCurrentAttribute(attribute);
    setEdit(true);
  };

  const handleDelete = async () => {
    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = gql`
        mutation removeAttribute {
          removeAttribute (
            id: "${attribute}"
          ) {id}
        }
    `;

    await graphQLClient
      .request(query)
      .then(() => {
        setOpen(false);
        setAttribute('');
        setAttributes([]);
      })
      .catch(() => alert('Error deleting category, Try again'));
  };

  React.useEffect(() => {
    setAttributeList(attributes.sort((a, b) => a.name.localeCompare(b.name)));
  }, [attributes]);

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
            <th style={{ width: '15%', padding: 12 }}>Name</th>
            <th style={{ width: '10%', padding: 12 }}>Category</th>
            <th style={{ width: '10%', padding: 12 }}>Type</th>
            <th style={{ width: '7.5%', padding: 12 }}>Min</th>
            <th style={{ width: '7.5%', padding: 12 }}>Max</th>
            <th style={{ width: '7.5%', padding: 12 }}>Step</th>
            <th style={{ width: '7.5%', padding: 12 }}>Symbol</th>
            <th style={{ width: '25%', padding: 12 }}>Values</th>
            <th style={{ width: '5%', padding: 12 }} />
            <th style={{ width: '5%', padding: 12 }} />
          </tr>
        </thead>
        <tbody>
          {attributeList.map((row: Attribute) => (
            <tr key={row.id} aria-label={row.id}>
              <td>
                {row.name}
              </td>
              <td>
                {row.category}
              </td>
              <td>
                {row.type}
              </td>
              <td>
                {row.min}
              </td>
              <td>
                {row.max}
              </td>
              <td>
                {row.step}
              </td>
              <td>
                {row.symbol}
              </td>
              <td>
                {row.values?.map((value:string) => (
                  <Chip key={value} sx={{ margin: '2px' }} variant="soft" color="neutral">{value}</Chip>
                ))}
              </td>
              <td>
                <IconButton aria-label={'edit-'+row.id}
                  onClick={() => handleEdit(row)}
                  sx={{ borderRadius: '50%' }}
                  size="sm" color="neutral">
                  <EditIcon />
                </IconButton>
              </td>
              <td>
                <IconButton aria-label={'delete-'+row.id}
                  size="sm" color="danger" onClick={() => handleOpen(row.id)}>
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
      {currentAttribute &&
        <EditAttributeModal attribute={currentAttribute} open={edit} setOpen={setEdit} />
      }
    </Sheet>
  );
}