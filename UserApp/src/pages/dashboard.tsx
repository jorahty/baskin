import Layout from '../components/layout/Layout';
import DashSidebar from '../components/layout/DashSidebar';
import { Box } from '@mui/joy';
import { useEffect, useState } from 'react';
import ProfileEdit from '../components/dashboard/ProfileEdit';
// import { useAppContext } from '../context';

export default function Dashboard() {
  const [items, setItems] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>('');

  // const { signedInUser } = useAppContext();

  const comps: Record<string, JSX.Element> = {
    'Profile Settings': <ProfileEdit />,
    'Poduct Listings': <Box>Poduct Listings</Box>,
    'Favorites': <Box>Favorites</Box>,
    'Messages': <Box>Messages</Box>,
  };

  const tabs = [
    'Profile Settings',
    'Poduct Listings',
    'Favorites',
    'Messages',
  ];

  useEffect(() => {
    setItems(tabs);
    setCurrent(tabs[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout sidebar={<DashSidebar
        items={items}
        current={current}
        setCurrent={setCurrent} />}>
        {comps[current]}
      </Layout>
    </>
  );
}
