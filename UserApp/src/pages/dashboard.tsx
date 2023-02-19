import Layout from '../components/layout/Layout';
import DashSidebar from '../components/layout/DashSidebar';
import { Box } from '@mui/joy';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [items, setItems] = useState<string[]>([]);
  const [current, setCurrent] = useState<string>('');

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
        <Box>{current}</Box>
      </Layout>
    </>
  );
}
