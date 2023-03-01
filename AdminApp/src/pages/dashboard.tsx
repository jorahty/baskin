import * as React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';


export default function Dashoard(){
  const [current, setCurrent] = useState<string>('');

  const comps: Record<string, JSX.Element> = {
    'Overview': <div>Welcome to the dashboard</div>,
    'Categories': <div>Welcome to the Categories</div>,
  };

  const tabs = ['Overview', 'Categories'];

  useEffect(() => {
    setCurrent(tabs[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout sidebar={<Sidebar tabs={tabs} current={current} setCurrent={setCurrent} />}>
        {comps[current]}
      </Layout>
    </>
  );
}