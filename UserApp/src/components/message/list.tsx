import { Message } from '../../graphql/message/schema';
import { List } from '@mui/joy';

import MessageCard from './card';

export interface MessageGroup {
  sender: string;
  messages: Message[];
}

function groupMessages(messages: Message[]) {
  const acc: MessageGroup[] = [];
  for (const message of messages) {
    if (acc.length === 0 || acc[acc.length - 1].sender !== message.sender) {
      acc.push({ sender: message.sender, messages: [message] });
    } else {
      acc[acc.length - 1].messages.push(message);
    }
  }
  return acc;
}

export default function MessageList({ messages }: { messages: Message[] }) {
  const groupedMessages = groupMessages(messages);

  return (
    <List>
      {groupedMessages.map((group, i) => (
        <MessageCard group={group} key={i} />
      ))}
    </List>
  );
}
