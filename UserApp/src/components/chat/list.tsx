import { useAppContext } from '../../context';
import { Chat } from '@/graphql/chat/schema';
import { List, ListItem, ListItemButton } from '@mui/joy';

interface Props {
  chats: Chat[];
  setSelectedChatId: (selectedChatId: { id: string }) => void;
}

export default function ChatList({ chats, setSelectedChatId }: Props) {
  const { signedInUser } = useAppContext();

  return (
    <List sx ={{ p: 0 }}>
      {chats.map((chat, i) => (
        <ListItem key={i}>
          <ListItemButton
            onClick={() => setSelectedChatId({ id: chat.id })}
          >
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
