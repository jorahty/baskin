import * as React from 'react';
import { Grid, Typography } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppContext } from '../../context';
import { gql, GraphQLClient } from 'graphql-request';

export default function CategoryField({ id, value, field }: {id: string, value: string, field:string}){
  const { signedInUser } = useAppContext();
  const [newValue, setNewValue] = React.useState(value);
  const [display, setDisplay] = React.useState('');
  const [edit, setEdit] = React.useState(false);

  const handleClose = () => {
    setEdit(false);
    setNewValue(value);
  };

  const handleSubmit = async () => {
    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = gql`
        mutation editCategory {
          editCategory (
            ${field}: "${newValue}"
            slug: "${id}"

          ) {slug}
        }
    `;
    console.log(query);

    await graphQLClient
      .request(query)
      .then(() => {
        setEdit(false);
      })
      .catch(() => alert('Error editing category, Try again'));
  };

  if (!edit) {
    return (
      <Grid container spacing={2}
        onMouseEnter={() => setDisplay(value)}
        onMouseLeave={() => setDisplay('')}
        direction="row"
        justifyContent="flex-start"
        alignItems="center">
        <Grid>
          <Typography fontWeight="md">
            {newValue}
          </Typography>
        </Grid>
        <Grid>
          <IconButton aria-label={'edit-'+id}
            onClick={() => setEdit(true)}
            sx={{ borderRadius: '50%', display: display == value ? 'display' : 'none' }}
            size="sm" color="neutral">
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="center">
        <Grid xs={10}>
          <Input value={newValue}
            aria-label="input"
            onChange={e => setNewValue(e.target.value)}
          />
        </Grid>
        <Grid xs={2}>
          <Grid container spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="center">
            <Grid xs={6}>
              <IconButton aria-label={'cancel-'+id}
                color="danger"
                onClick={handleClose}
                size="sm">
                <ClearIcon />
              </IconButton>
            </Grid>
            <Grid xs={6}>
              <IconButton aria-label={'submit-'+id}
                onClick={handleSubmit}
                size="sm">
                <CheckIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}