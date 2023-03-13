import * as React from 'react';
import { useAppContext } from '../../../context';
import { Product } from '../../../graphql/product/schema';
import CreateLayout from '../../../components/layout/CreateLayout';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { gql, GraphQLClient } from 'graphql-request';

export default function ProductEdit({
  product,
  handleCancel,
  updateProductList,
  productList,
}: {
  product: Product;
  handleCancel: () => void;
  updateProductList: React.Dispatch<React.SetStateAction<Product[]>>;
  productList: Product[];
}) {
  const { signedInUser } = useAppContext();

  const handleUpdate = async (
    name: string,
    description: string,
    price: number,
    category: string,
    quantity: number,
    pictures: File[],
  ) => {
    const existingImages: string[] = product.images;
    const formData: FormData = new FormData();
    pictures.map((picture: File) => {
      formData.append('files', picture, picture.name);
    });

    const imageData = await fetch('http://localhost:4001/api/v0/image', {
      method: 'POST',
      body: formData,
    });

    const picturesIdArr: string[] = await imageData.json();
    const allImages = existingImages.concat(picturesIdArr);

    const graphQLClient = new GraphQLClient('http://localhost:4002/graphql');
    const query = gql`
        mutation updateProduct {
            updateProduct (
                id: "${product.id}",
                input: {
                  user: "${signedInUser?.username}",
                  name: "${name}",
                  description: "${description}",
                  price: ${price},
                  category: "${
  category === 'Choose Category' ? product.category : category
}",
                  quantity: ${quantity},
                  images: [${allImages.map((p: string) => `"${p}"`)}],
                  discount: 0,
            }) {id, user, name, description, date, price, category, quantity, images, discount}
        }
    `;

    await graphQLClient.request(query).then(res => {
      product = res.updateProduct;
      // Remove product from product list
      const index = productList.findIndex(
        (tempProd: Product) => tempProd.id === product.id,
      );
      productList.splice(index);
      productList.push(product);
      updateProductList(productList);

      // Return to dashboard
      handleCancel();
    });
  };

  return (
    <CreateLayout
      handleCancel={handleCancel}
      handleCreate={handleUpdate}
      product={product}
    />
  );
}
