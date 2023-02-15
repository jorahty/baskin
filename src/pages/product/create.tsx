import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Layout from '../../components/layout/Layout';
import {Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Router from 'next/router';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import { GraphQLClient, gql } from 'graphql-request';
import { GetServerSideProps } from "next";
import { Category } from "@/graphql/category/schema";
import { CategoryService } from "../../graphql/category/service";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      categories: await new CategoryService().list({})
    },
  }
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  quantity: HTMLInputElement;
  price: HTMLInputElement;
}

interface ProductFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Create({ categories }: { categories: Category[] }) {
  const [category, setCategory] = React.useState("Choose Category")
  const handleCancel = () => {
    Router.push({
      pathname: '/'
    })
  };
  
  const handleCreate = async (name:string, description:string, price:number, category:string, quantity:number) => {
    const item = localStorage.getItem('user')
    const user = JSON.parse(item)
    const bearerToken = user.accessToken
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
    // const graphQLClient = new GraphQLClient('/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    const query = gql`mutation create {create (name: "${name}" description: "${description}" price: ${price} category: "${category}" quantity: ${quantity}) {id}}`

    await graphQLClient.request(query)
      .then(() => Router.push({pathname: '/'}))
      .catch(() => alert("Error creating product, Try again"));
  };

  return(
    <CssVarsProvider>
      <Layout>
        <form
          onSubmit={(event: React.FormEvent<ProductFormElement>) => {
            event.preventDefault();
            const formElements = event.currentTarget.elements;
            handleCreate(formElements.name.value, formElements.description.value, parseFloat(formElements.price.value), category, parseInt(formElements.quantity.value));
          }}
        >
          <Grid container spacing={2} columns={16} sx={{ maxWidth: '100%', padding: '50px'}}>
            <Grid xs={6}>
              <Grid container direction='column' alignItems="stretch" sx={{
                "& form": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                  visibility: "hidden",
                }}}
              >
                <Grid sx={{height: '75px'}}>
                  <Typography component="h2" fontSize="xl3" fontWeight="lg">
                    Create New Product
                  </Typography>
                </Grid>
                <Grid sx={{height: '75px'}}>
                  <FormControl required>
                    <FormLabel>Product Name</FormLabel>
                    <Input placeholder="Vintage Hoodie Sweatshirt" type="name" name="name"/>
                  </FormControl>
                </Grid>
                <Grid sx={{height: '75px'}}>
                  <FormControl required>
                    <FormLabel>Category</FormLabel>
                    <Select placeholder="Choose catergory" data-testid="category" aria-label='category' name="category" onChange={(_, v) => {setCategory(v)}}>
                      {categories?.map(({ name, slug }) => (
                        <Option value={slug} key={slug} aria-label={name}>{name}</Option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{height: '75px'}}>
                  <FormControl required>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type="number"
                      name="price"
                      placeholder="Amount"
                      startDecorator="$"
                      slotProps={{
                        input: {
                          min: 0,
                          step: .01,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid sx={{height: '75px'}}>
                  <FormControl required>
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      placeholder="1"
                      name="quantity"
                      type="number"
                      defaultValue={1}
                      slotProps={{
                        input: {
                          min: 1,
                          step: 1,
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={10}>
              <Grid container direction='column' alignItems="stretch"sx={{
                "& form": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                  visibility: "hidden",
                }}}>
                <Grid sx={{height: '75px'}}>
                  <Button size="lg" variant='soft' color="neutral" fullWidth
                    startDecorator={<PhotoCameraIcon />}>
                    Add Pictures
                  </Button>
                </Grid>
                <Grid sx={{height: '250px'}}>
                  <FormControl required>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name='description'
                      placeholder="Product description"
                      minRows={8}
                      maxRows={8}
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <Box sx={{display:'flex', gap: 2}}>
                    <Button onClick={handleCancel} fullWidth aria-label='cancel' variant='soft'>
                      Cancel
                    </Button> 
                    <Button type="submit" fullWidth aria-label='create'>
                      Create
                    </Button> 
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>     
        </form> 
      </Layout>
    </CssVarsProvider>
  )
}
