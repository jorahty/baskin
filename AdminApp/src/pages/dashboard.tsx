import * as React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Layout from '../components/layout/Layout';
import CategoriesPage from '../components/categories/CategoriesPage';
import AuthGuard from '../components/AuthGuard';


export default function Dashoard(){
  const [current, setCurrent] = useState<string>('');

  const comps: Record<string, JSX.Element> = {
    'Overview': <div>Welcome to the dashboard</div>,
    'Categories': <CategoriesPage />,
  };

  const tabs = ['Overview', 'Categories'];

  useEffect(() => {
    setCurrent(tabs[0]);
  }, []);

  return (
    <AuthGuard>
      <Layout sidebar={<Sidebar tabs={tabs} current={current} setCurrent={setCurrent} />}>
        {comps[current]}
      </Layout>
    </AuthGuard>
  );
}