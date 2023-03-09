import { Dispatch, SetStateAction, useState } from 'react';
import { Input, Button } from '@mui/joy';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useAppContext } from '../../context';
import { Chat } from '../../graphql/chat/schema';
import { Message } from '../../graphql/message/schema';
import { gql, GraphQLClient } from 'graphql-request';

interface MessageInputProps {
  chat: Chat | undefined;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

interface FormElements extends HTMLFormControlsCollection {
  message: HTMLInputElement;
}

interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function MessageInput({ chat, messages, setMessages }: MessageInputProps) {
  const { signedInUser } = useAppContext();
  const [text, setText] = useState('');

  const handleSubmit = async (message: string) => {
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${signedInUser?.accessToken}`,
      },
    });

    const mutation = gql`
        mutation sendMessage {
          sendMessage (message: {
            chat_id: "${chat?.id}",
            content: "${message}"
          }) { sender, content, date }
        }
      `;

    const { sendMessage: newMessage } = await graphQLClient.request(mutation);
    setMessages([...messages, newMessage]);
  };

  return (
    <form
      onSubmit={(event: React.FormEvent<MessageFormElement>) => {
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        setText('');
        handleSubmit(formElements.message.value);
      }}
    >
      <Input
        placeholder="Aa"
        autoComplete="off"
        name="message"
        value={text}
        onChange={event => setText(event.target.value)}
        endDecorator={
          <Button
            aria-label="send-message"
            type="submit"
            disabled={(!text.length && true) || false}
            sx={{ p: 0.5, borderRadius: '50%' }}
          >
            <ArrowUpwardRoundedIcon />
          </Button>
        }
        sx={{ borderRadius: '120px' }}
      />
    </form>
  );
}
