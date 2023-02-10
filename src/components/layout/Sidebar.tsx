import { List, ListItem, ListItemButton, ListSubheader } from "@mui/joy";
import { Box } from "@mui/system";

/*
  Currently the Category list items will be hard coded,
  but in the future they will be dynamically generated
  from the database if, for instance, we were to add a
  new category to the database.
*/

export default function Sidebar() {

  const categories = [
    "Electronics", 
    "Clothing",
    "Sports Equipment",
    "Toys",
    "Furniture",
    "Instruments",
    "Office",
    "Free"
  ];

  return (
    <>
      <Box sx={{ width: "100%", height: "90%" }}>
        <List
          variant="outlined"
          sx={{
            margin: 2,
            width: 200,
            bgcolor: 'background.body',
            borderRadius: 'sm',
          }}
        >
          <ListItem nested>
            <ListSubheader>
              Shop by Category
            </ListSubheader>
            <List>
              {categories.map((category) => (
                <ListItem key={category}>
                  <ListItemButton href="/">
                    {category}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
