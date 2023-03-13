import * as React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Layout from '../components/layout/Layout';
import CategoryPage from '../components/category/CategoryPage';
import AuthGuard from '../components/AuthGuard';
import AttributePage from '../components/attribute/AttributePage';
import RolesPage from '../components/roles/RolesPage';


export default function Dashoard(){
  const [current, setCurrent] = useState<string>('');

  const comps: Record<string, JSX.Element> = {
    'Overview': <div>Welcome to the dashboard</div>,
    'Category': <CategoryPage />,
    'Attribute': <AttributePage />,
    'Set Roles': <RolesPage />,
  };

  const tabs = ['Overview', 'Category', 'Attribute', 'Set Roles'];

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