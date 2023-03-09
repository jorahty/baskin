import * as React from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import Router from 'next/router';
import Layout from '../../components/layout/Layout';
import AuthGuard from '../../components/common/AuthGuard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { useAppContext } from '../../context';
import CreateLayout from '../../components/layout/CreateLayout';

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default function Create() {
  const { signedInUser } = useAppContext();

  const handleCancel = () => {
    Router.push({
      pathname: '/',
    });
  };

  async function handleCreate(
    name: string,
    description: string,
    price: number,
    category: string,
    quantity: number,
    pictures: File[],
  ) {
    const formData: FormData = new FormData();
    pictures.map((picture: File) => {
      formData.append('files', picture, picture.name);
    });

    const imageData = await fetch('http://localhost:4001/api/v0/image', {
      method: 'POST',
      body: formData,
    });

    const picturesIdArr: string[] = await imageData.json();

    const graphQLClient = new GraphQLClient('http://localhost:4002/graphql');
    const query = gql`
        mutation addProduct {
            addProduct (input: {
                user: "${signedInUser?.username}",
                name: "${name}",
                description: "${description}",
                price: ${price},
                category: "${category}",
                quantity: ${quantity},
                pictures: [${picturesIdArr.map((p: string) => `"${p}"`)}],
                discount: 0,
            }) {id}
        }
    `;

    await graphQLClient
      .request(query)
      .then(() =>
        Router.push({
          pathname: '/',
        }),
      )
      .catch(() => {
        picturesIdArr.forEach((pic: string) => {
          fetch(`http://localhost:4001/api/v0/image/${pic}`, {
            method: 'DELETE',
          });
        });
        alert('Error creating product, Try again');
      });
  }

  return (
    <AuthGuard>
      <Layout>
        <CreateLayout handleCreate={handleCreate} handleCancel={handleCancel} />
      </Layout>
    </AuthGuard>
  );
}
