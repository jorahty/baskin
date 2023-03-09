import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { useAppContext } from '../../context';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { Attribute } from '@/graphql/attribute/schema';
import { gql, GraphQLClient } from 'graphql-request';
import Stack from '@mui/joy/Stack';
import Select, { selectClasses } from '@mui/joy/Select';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/joy/IconButton';
import ChipDelete from '@mui/joy/ChipDelete';
import Chip from '@mui/joy/Chip';
import Button from '@mui/joy/Button';


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

export default function EditAttributeModal({ attribute, open, setOpen }:
  { attribute: Attribute, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}){
  const { signedInUser } = useAppContext();
  const [categories, setCategories] = useState<{slug:string}[]>([]);
  const [selections, setSelections] = useState<string[]>([]);
  const [newSelection, setNewSelection] = useState<string>('');
  const [category, setCategory] = useState('');

  const [type, setType] = useState('');

  const handleCancel = () => {
    setCategory('');
    setOpen(false);
    setNewSelection('');
    setSelections([]);
    setType('');
  };

  const handleAdd = () => {
    if (!selections.includes(newSelection) && newSelection != '') {
      setSelections(selections.concat([newSelection]));
      setNewSelection('');
    }
  };

  const handleRemove = (value:string) => {
    const temp = [...selections];
    temp.splice(selections.indexOf(value), 1);
    setSelections(temp);
  };

  const handleSubmit = async (name: string, min:string, max:string, step:string, symbol:string) => {
    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = gql`
      mutation editAttribute {
        editAttribute ( input: {
          id: "${attribute.id}",
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
    setType(attribute.type);
    setSelections(attribute.values ? attribute.values : []);
    setCategory(attribute.category);
    const fetchCategories = async () => {
      const graphQLClient = new GraphQLClient('http://localhost:3001/api/graphql', {
        headers: {
          Authorization: `Bearer ${signedInUser?.accessToken}`,
        },
      });

      const query = gql`
        query getAllCategories {
          category {
            slug
          }
        }
      `;

      const data = await graphQLClient.request(query);

      setCategories(data.category);
    };

    fetchCategories();

  }, [signedInUser, open]);

  return(
    <Modal open={open} onClose={handleCancel}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ width: 750 }}
      >
        <Typography id="basic-modal-dialog-title" component="h2">
          Edit attribute
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
          <Grid container spacing={2} sx={{ margin: '2px' }}>
            <Grid xs={6}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Attribute Name</FormLabel>
                  <Input name="name" aria-label="name"
                    defaultValue={attribute.name} autoFocus={!focus} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    aria-label="category"
                    defaultValue={attribute.category}
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
                    {categories.map((category: {slug: string}) => (
                      <Option key={category.slug}
                        aria-label={category.slug}
                        value={category.slug}>{category.slug}</Option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <Select
                    aria-label="type"
                    placeholder="Select a type…"
                    defaultValue={attribute.type}
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
                  placeholder="Enter a selection"
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
            </Grid>
            <Grid xs={6}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Minimum</FormLabel>
                  <Input name="min" aria-label="min"
                    type="number" defaultValue={attribute.min}
                    placeholder="Enter a minimum…" />
                </FormControl>
                <FormControl>
                  <FormLabel>Maximum</FormLabel>
                  <Input name="max" aria-label="max"
                    type="number" defaultValue={attribute.max}
                    placeholder="Enter a maximum…" />
                </FormControl>
                <FormControl>
                  <FormLabel>Step</FormLabel>
                  <Input name="step" aria-label="step"
                    type="number" defaultValue={attribute.step}
                    placeholder="Enter a step…" />
                </FormControl>
                <FormControl>
                  <FormLabel>Symbol</FormLabel>
                  <Input name="symbol" aria-label="symbol"
                    defaultValue={attribute.symbol}
                    placeholder="Enter a symbol…" />
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
          <Stack spacing={2}>
            <Button type="cancel" variant="outlined" onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}