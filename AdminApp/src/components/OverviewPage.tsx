import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Container from '@mui/joy/Container';
import { useAppContext } from '../context';
import { gql, GraphQLClient } from 'graphql-request';

// Citation: https://mui.com/joy-ui/react-card/

export default function OverviewPage() {
  const { signedInUser } = useAppContext();
  const [stats, setStats] = React.useState<{
    user: number,
    message: number,
    chat: number,
    product: number,
    attribute: number,
    category: number,
  }>();

  React.useEffect(() => {
    if (!signedInUser) return;
    const fetchData = async () => {
      const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}`,
        },
      });

      const query = gql`
        query getStats {
          stat {
            user, message, chat, product, attribute, category
          }
        }
      `;

      const data = await graphQLClient.request(query);

      setStats(data.stat);
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
        Overview Stats
      </Typography>
      <Grid
        sx={{ marginLeft: '2px', flexGrow: 1 }}
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid xs={12} md={6} lg={4}>
          <Card
            orientation="horizontal"
            variant="outlined"
            sx={{ width: 300, height: 150 }}
          >
            <CardContent sx={{ px: 2 }}>
              <Typography level="h1" fontWeight="md" mb={0.5}>
                {stats?.category}
              </Typography>
              <Typography level="h4" fontWeight="md" mb={0.5}>
                Categories
              </Typography>
            </CardContent>
            <Divider />
            <CardOverflow
              variant="soft"
              color="primary"
              sx={{
                px: 0.4,
                writingMode: 'vertical-rl',
                textAlign: 'center',
                fontSize: 'xs2',
                fontWeight: 'xl2',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Product Service
            </CardOverflow>
          </Card>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Card
            orientation="horizontal"
            variant="outlined"
            sx={{ width: 300, height: 150 }}
          >
            <CardContent sx={{ px: 2 }}>
              <Typography level="h1" fontWeight="md" mb={0.5}>
                {stats?.attribute}
              </Typography>
              <Typography level="h4" fontWeight="md" mb={0.5}>
                Attributes
              </Typography>
            </CardContent>
            <CardOverflow
              variant="soft"
              color="primary"
              sx={{
                px: 0.4,
                writingMode: 'vertical-rl',
                textAlign: 'center',
                fontSize: 'xs2',
                fontWeight: 'xl2',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Product Service
            </CardOverflow>
          </Card>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Card
            orientation="horizontal"
            variant="outlined"
            sx={{ width: 300, height: 150 }}
          >
            <CardContent sx={{ px: 2 }}>
              <Typography level="h1" fontWeight="md" mb={0.5}>
                {stats?.product}
              </Typography>
              <Typography level="h4" fontWeight="md" mb={0.5}>
                Products
              </Typography>
            </CardContent>
            <CardOverflow
              variant="soft"
              color="primary"
              sx={{
                px: 0.4,
                writingMode: 'vertical-rl',
                textAlign: 'center',
                fontSize: 'xs2',
                fontWeight: 'xl2',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Product Service
            </CardOverflow>
          </Card>
        </Grid>
        <Grid xs={12} md={6}lg={4}>
          <Card
            orientation="horizontal"
            variant="outlined"
            sx={{ width: 300, height: 150 }}
          >
            <CardContent sx={{ px: 2 }}>
              <Typography level="h1" fontWeight="md" mb={0.5}>
                {stats?.user}
              </Typography>
              <Typography level="h4" fontWeight="md" mb={0.5}>
                Users
              </Typography>
            </CardContent>
            <CardOverflow
              variant="soft"
              color="primary"
              sx={{
                px: 0.4,
                writingMode: 'vertical-rl',
                textAlign: 'center',
                fontSize: 'xs2',
                fontWeight: 'xl2',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Account Service
            </CardOverflow>
          </Card>
        </Grid>
        <Grid xs={12} md={6}lg={4}>
          <Card
            orientation="horizontal"
            variant="outlined"
            sx={{ width: 300, height: 150 }}
          >
            <CardContent sx={{ px: 2 }}>
              <Typography level="h1" fontWeight="md" mb={0.5}>
                {stats?.chat}
              </Typography>
              <Typography level="h4" fontWeight="md" mb={0.5}>
                Chats
              </Typography>
            </CardContent>
            <CardOverflow
              variant="soft"
              color="primary"
              sx={{
                px: 0.4,
                writingMode: 'vertical-rl',
                textAlign: 'center',
                fontSize: 'xs2',
                fontWeight: 'xl2',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Message Service
            </CardOverflow>
          </Card>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Card
            orientation="horizontal"
            variant="outlined"
            sx={{ width: 300, height: 150 }}
          >
            <CardContent sx={{ px: 2 }}>
              <Typography level="h1" fontWeight="md" mb={0.5}>
                {stats?.attribute}
              </Typography>
              <Typography level="h4" fontWeight="md" mb={0.5}>
                Messages
              </Typography>
            </CardContent>
            <CardOverflow
              variant="soft"
              color="primary"
              sx={{
                px: 0.4,
                writingMode: 'vertical-rl',
                textAlign: 'center',
                fontSize: 'xs2',
                fontWeight: 'xl2',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Message Service
            </CardOverflow>
          </Card>
        </Grid>
      </Grid>


    </Container>
  );
}