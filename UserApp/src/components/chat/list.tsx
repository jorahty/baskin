import { Chat } from '@/graphql/chat/schema';
import { List, ListItem, ListItemButton } from '@mui/joy';

export default function ChatList({ chats }: { chats: Chat[] }) {
  return (
    <List>
      {chats.map((chat, i) => (
        <ListItem key={i}>
          <ListItemButton>{chat.id}</ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
