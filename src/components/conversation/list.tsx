import { Conversation } from "@/graphql/conversation/schema";
import {  List, ListItem, ListItemButton } from "@mui/joy";



export default function ConversationList({ conversations }:{ conversations: Conversation[] }){
  return(
    <List>
      {conversations.map((conversation,i) => (
        <ListItem key = {i}>
          <ListItemButton>
            {conversation.id}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}