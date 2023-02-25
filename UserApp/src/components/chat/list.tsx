import { useAppContext } from '../../context';
import { Chat } from '@/graphql/chat/schema';
import { List, ListItem, ListItemButton } from '@mui/joy';

interface Props {
  chats: Chat[];
  setSelectedChatId: (selectedChatId: { id: string }) => void;
}

export default function ChatList({ chats, setSelectedChatId }: Props) {
  const { signedInUser } = useAppContext();

  function renderChatName(chat: Chat) {
    if (chat.name) return chat.name; // chat already has a name

    // get array of other members (remove the signed-in user from chat members array)
    const otherMembers = chat.members.filter(member => member.username !== signedInUser?.username);

    // if there is only one other chat member, render their full name
    if (otherMembers.length === 1) return otherMembers[0].name;

    // else, render comma-seperated list of first names
    return otherMembers.map(member => member.name.split(' ')[0]).join(', ');
  }

  return (
    <List sx ={{ p: 0 }}>
      {chats.map(chat => (
        <ListItem key={chat.id}>
          <ListItemButton
            onClick={() => setSelectedChatId({ id: chat.id })}
          >
            {renderChatName(chat)}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
