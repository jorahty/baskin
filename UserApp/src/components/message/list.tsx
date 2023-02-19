import { Message } from '../../graphql/message/schema';
import { List, ListItem } from '@mui/joy';

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <List>
      {messages.map((message, i) => (
        <ListItem key={i}>{message.content}</ListItem>
      ))}
    </List>
  );
}
