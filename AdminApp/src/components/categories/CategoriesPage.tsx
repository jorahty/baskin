import { Button, Container, Stack } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import { AddCircle } from '@mui/icons-material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Input from '@mui/joy/Input';
import { useEffect, useState } from 'react';
import { Category } from '@/graphql/category/schema';
import { gql, GraphQLClient } from 'graphql-request';
import CategoryTable from './CategoryTable';
import { useAppContext } from '../../context';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface CategoryFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function CategoriesPage() {
  const { signedInUser } = useAppContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState('');

  const handleCancel = () => {
    setParent('');
    setOpen(false);
  };

  const handleSubmit = async (name: string) => {
    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = gql`
        mutation addCategory {
          addCategory ( input: {
            name: "${name}",
            slug: "${name.toLowerCase()}",
            parent: "${parent}"
          }  
            ) {slug}
        }
    `;

    await graphQLClient
      .request(query)
      .then(() => {
        setOpen(false);
        setParent('');
      })
      .catch(() => alert('Error creating category, Try again'));
  };

  useEffect(() => {
    if (!signedInUser) return;
    const fetchData = async () => {
      const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}`,
        },
      });

      const query = gql`
        query getAllCategories {
          category {
            name
            slug
            parent
          }
        }
      `;

      const data = await graphQLClient.request(query);

      setCategories(data.category);
    };

    fetchData();
  }, [signedInUser, open]);

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
        All Categories
      </Typography>
      <Button
        startDecorator={<AddCircle />}
        sx={{
          width: { md: 'fit-content' },
        }}
        onClick={() => setOpen(true)}
      >
          Add Category
      </Button>
      <Stack height={'80vh'}>
        <CategoryTable categories={categories} />
      </Stack>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Create new category
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Fill in the information of the category.
          </Typography>
          <form
            onSubmit={(event: React.FormEvent<CategoryFormElement>) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              handleSubmit(
                formElements.name.value
              );
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input name="name" aria-label="name"
                  placeholder="Enter a name…" autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Parent Category</FormLabel>
                <Select
                  aria-label="parent"
                  placeholder="Select a parent…"
                  indicator={<KeyboardArrowDown />}
                  onChange={(_, value) => setParent(value as string)}
                  sx={{
                    [`& .${selectClasses.indicator}`]: {
                      transition: '0.2s',
                      [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                      },
                    },
                  }}
                >
                  {categories.map((category: Category) => (
                    <Option key={category.slug}
                      aria-label={category.name}
                      value={category.slug}>{category.name}</Option>
                  ))}
                </Select>
              </FormControl>
              <Button type="cancel" variant="outlined" onClick={handleCancel}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </Container>
  );
}