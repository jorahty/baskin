import { Chat } from '@/graphql/chat/schema';
import { List } from '@mui/joy';
import ChatCard from './card';

interface Props {
  chats: Chat[];
  selectedChat: undefined | Chat;
}

export default function ChatList({ chats, selectedChat }: Props) {
  return (
    <List sx={{ p: 0, width: 240 }}>
      {chats.map(chat => (
        <ChatCard
          key={chat.id}
          selected={chat.id === selectedChat?.id}
          chat={chat}
        />
      ))}
    </List>
  );
}
