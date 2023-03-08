import { useEffect, useState } from 'react';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { AddCircle } from '@mui/icons-material';
import Container from '@mui/joy/Container';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import AttributeTable from './AttributeTable';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Option from '@mui/joy/Option';
import Select, { selectClasses } from '@mui/joy/Select';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/joy/IconButton';
import ChipDelete from '@mui/joy/ChipDelete';
import { useAppContext } from '../../context';
import { Attribute } from '@/graphql/attribute/schema';
import { gql, GraphQLClient } from 'graphql-request';
import { Chip } from '@mui/joy';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  min: HTMLInputElement;
  max: HTMLInputElement;
  step: HTMLInputElement;
  symbol: HTMLInputElement;
}

interface AttributeFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
export default function AttributePage() {
  const { signedInUser } = useAppContext();
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [categories, setCategories] = useState<{name:string}[]>([]);

  const [open, setOpen] = useState(false);

  const [focus, setFocus] = useState(false);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [selections, setSelections] = useState<string[]>([]);
  const [newSelection, setNewSelection] = useState<string>('');


  const handleAdd = () => {
    if (!selections.includes(newSelection) || newSelection != '') {
      setFocus(true);
      setSelections(selections.concat([newSelection]));
      setNewSelection('');
    }
  };

  const handleRemove = (value:string) => {
    const temp = [...selections];
    temp.splice(selections.indexOf(value), 1);
    setSelections(temp);
  };

  const handleCancel = () => {
    setCategory('');
    setOpen(false);
    setNewSelection('');
    setSelections([]);
    setType('');
  };

  const handleSubmit = async (name: string, min:string, max:string, step:string, symbol:string) => {
    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = gql`
      mutation addAttribute {
        addAttribute ( input: {
          name: "${name}",
          category: "${category.toLowerCase()}",
          type: "${type}",
          min: ${min ? min : null},
          max: ${max ? max : null},
          step: ${step ? step : null},
          symbol: ${symbol ? `"${symbol}"` : null},
          values: ${selections.length == 0 ? null : `[${selections.map(((s:string) => `"${s}"`))}]`}
        }  
          ) {id}
      }
  `;

    await graphQLClient
      .request(query)
      .then(() => {
        handleCancel();
      })
      .catch(() => alert('Error creating attribute, Try again'));
    handleCancel();
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
        query getAllAttributes {
          attribute {
            id
            category
            name
            type
            min
            max
            step
            symbol
            values
          }
        }
      `;

      const data = await graphQLClient.request(query);

      setAttributes(data.attribute);
    };

    const fetchCategories = async () => {
      const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}`,
        },
      });

      const query = gql`
        query getAllCategories {
          category {
            name
          }
        }
      `;

      const data = await graphQLClient.request(query);

      setCategories(data.category);
    };

    fetchData();
    fetchCategories();
  }, [signedInUser, attributes]);

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
        All Attributes
      </Typography>
      <Button
        startDecorator={<AddCircle />}
        sx={{
          width: { md: 'fit-content' },
        }}
        onClick={() => setOpen(true)}
      >
          Add Attribute
      </Button>
      <Stack height={'80vh'}>
        <AttributeTable attributes={attributes} setAttributes={setAttributes} />
      </Stack>
      <Modal open={open} onClose={handleCancel}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ width: 750 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Create new category
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Fill in the information of the category.
          </Typography>
          <form
            onSubmit={(event: React.FormEvent<AttributeFormElement>) => {
              event.preventDefault();
              const formElements = event.currentTarget.elements;
              handleSubmit(
                formElements.name.value,
                formElements.min.value,
                formElements.max.value,
                formElements.step.value,
                formElements.symbol.value
              );
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Attribute Name</FormLabel>
                <Input name="name" aria-label="name"
                  placeholder="Enter a name…" autoFocus={!focus} required />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  aria-label="category"
                  placeholder="Select a category…"
                  indicator={<KeyboardArrowDown />}
                  onChange={(_, value) => setCategory(value as string)}
                  sx={{
                    [`& .${selectClasses.indicator}`]: {
                      transition: '0.2s',
                      [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                      },
                    },
                  }}
                >
                  {categories.map((category: {name: string}) => (
                    <Option key={category.name}
                      aria-label={category.name}
                      value={category.name}>{category.name}</Option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select
                  aria-label="type"
                  placeholder="Select a type…"
                  indicator={<KeyboardArrowDown />}
                  onChange={(_, value) => setType(value as string)}
                  sx={{
                    [`& .${selectClasses.indicator}`]: {
                      transition: '0.2s',
                      [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                      },
                    },
                  }}
                >
                  <Option
                    aria-label="set"
                    value="set">
                      set
                  </Option>
                  <Option
                    aria-label="number"
                    value="number">
                      number
                  </Option>
                  <Option
                    aria-label="color"
                    value="color">
                      color
                  </Option>
                </Select>
              </FormControl>
              <FormControl sx={{ display: type == 'number' ? 'display' : 'none' }}>
                <FormLabel>Minimum</FormLabel>
                <Input name="min" aria-label="min"
                  type="number"
                  placeholder="Enter a minimum…" />
              </FormControl>
              <FormControl sx={{ display: type == 'number' ? 'display' : 'none' }}>
                <FormLabel>Maximum</FormLabel>
                <Input name="max" aria-label="max"
                  type="number"
                  placeholder="Enter a maximum…" />
              </FormControl>
              <FormControl sx={{ display: type == 'number' ? 'display' : 'none' }}>
                <FormLabel>Step</FormLabel>
                <Input name="step" aria-label="step"
                  type="number"
                  placeholder="Enter a step…" />
              </FormControl>
              <FormControl sx={{ display: type == 'number' ? 'display' : 'none' }}>
                <FormLabel>Symbol</FormLabel>
                <Input name="symbol" aria-label="symbol"
                  placeholder="Enter a symbol…" />
              </FormControl>
              {type == 'set' &&
              <Stack spacing={2}>
                <FormLabel>Set of Selections</FormLabel>
                <Box>
                  {selections.map((selection:string) => (
                    <Chip key={selection} sx={{ margin: '2px' }}
                      variant="soft" color="neutral"
                      endDecorator={
                        <ChipDelete
                          aria-label={'remove-'+selection}
                          onDelete={() => handleRemove(selection)}
                        />
                      }
                    >
                      {selection}
                    </Chip>
                  ))}
                </Box>
                <Input name="selection" aria-label="selection"
                  value={newSelection}
                  onChange={e => setNewSelection(e.target.value)}
                  placeholder="Enter a selection" autoFocus={focus}
                  endDecorator={
                    <IconButton type="button" onClick={handleAdd}
                      aria-label="add-selection"
                      sx={{ borderRadius: '50%' }}
                      color="neutral"
                    >
                      <AddIcon />
                    </IconButton>
                  }
                />
              </Stack>
              }
              <Button type="cancel" variant="outlined" onClick={handleCancel}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </Container>
  );
}