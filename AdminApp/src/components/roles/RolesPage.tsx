import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Container from '@mui/joy/Container';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { gql, GraphQLClient } from 'graphql-request';
import { useAppContext } from '../../context';

export default function RolesPage() {
  const { signedInUser } = useAppContext();
  const [user, setUser] = React.useState<string|null>();
  const [role, setRole] = React.useState<string|null>();
  const [users, setUsers] = React.useState<string[]>([]);

  const handleChange = async () => {
    if (!role || !user) {
      alert('Both fields are required!');
      return;
    }
    let roles:string[] = [];
    if (role == 'member') {
      roles = ['member'];
    } else if (role == 'moderator') {
      roles = ['member', 'moderator'];
    } else if (role == 'admin') {
      roles = ['member', 'moderator', 'admin'];
    }

    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = gql`
      mutation updateRoles {
        updateRoles ( input: {
          username: "${user}"
          roles: ${`[${roles.map(((s:string) => `"${s}"`))}]`}
        }  
          ) {username}
      }
  `;

    await graphQLClient
      .request(query)
      .then(() => {
        alert('Succesfully updated role');
      })
      .catch(() => alert('Error creating attribute, Try again'));
  };

  React.useEffect(() => {
    if (!signedInUser) return;
    const fetchData = async () => {
      const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}`,
        },
      });

      const query = gql`
        query getAllUsers {
          user {
            username
          }
        }
      `;

      const data = await graphQLClient.request(query);
      setUsers(data.user.map((v:{username: string}) => v.username));
    };

    fetchData();
  }, [signedInUser]);


  return (
    <Container sx={{ margin: '16px auto' }}>
      <Typography
        component="h1"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'primary',
          mb: 4,
        }}
      >
        Change User Roles
      </Typography>
      {users.length != 0 && <Grid
        sx={{ marginLeft: '2px' }}
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid>
          <Typography>Username</Typography>
        </Grid>
        <Grid>
          <Autocomplete
            aria-label="username"
            autoHighlight
            placeholder="Enter username"
            onChange={(_, v) => setUser(v)}
            options={users}
            sx={{ width: 300 }}
          />
        </Grid>
        <Grid>
          <Typography>Role</Typography>
        </Grid>
        <Grid>
          <Select placeholder="Set user role" sx={{ width: 300 }}
            onChange={(_, value) => setRole(value as string)}
            aria-label="roles"
          >
            <Option value="member" aria-label="member">Member</Option>
            <Option value="moderator" aria-label="moderator">Moderator</Option>
            <Option value="admin" aria-label="admin">Admin</Option>
            <Option value="none" aria-label="none">None</Option>
          </Select>
        </Grid>
        <Grid>
          <Button aria-label="change" onClick={handleChange}>Change!</Button>
        </Grid>
      </Grid>}
    </Container>
  );
}
