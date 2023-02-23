import { Message } from '../../graphql/message/schema';
import { List } from '@mui/joy';
import { Box } from '@mui/joy';

import ListCard from './card';

export interface MessageGroup {
  sender: string;
  messages: string[];
}

function groupMessages(messages: Message[]) {
  const acc: MessageGroup[] = [];
  for (const message of messages) {
    if (acc.length === 0 || acc[acc.length - 1].sender !== message.sender) {
      acc.push({ sender: message.sender, messages: [message.content] });
    } else {
      acc[acc.length - 1].messages.push(message.content);
    }
  }
  return acc;
}

export default function MessageList({ messages }: { messages: Message[] }) {
  const groupedMessages = groupMessages(messages);

  return (
    <Box sx={{ overflowY: 'scroll' }}>
      <List>
        {groupedMessages.map((group, i) => (
          <ListCard group={group} key={i} />
        ))}
      </List>
    </Box>
  );
}
