import { useAppContext } from '../../context';
import { Chat } from '@/graphql/chat/schema';
import { List, ListItem, ListItemButton } from '@mui/joy';

export default function ChatList({ chats }: { chats: Chat[] }) {
  const { signedInUser } = useAppContext();

  return (
    <List sx ={{ p: 0 }}>
      {chats.map((chat, i) => (
        <ListItem key={i}>
          <ListItemButton>
            {
              chat.name ||
              chat.members
                .map(member => member.name)
                .filter(name => name !== signedInUser?.name)
                .join(', ')
            }
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
