import ChatList from '../components/chat/list';
import Layout from '../components/layout/Layout';

import { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import MessageList from '../components/message/list';
import { useAppContext } from '../context';

export default function MessagesPage() {
  const { signedInUser } = useAppContext();

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState<{ id: string } | undefined>();

  // fetch chats
  useEffect(() => {
    const bearerToken = signedInUser?.accessToken;
    const userId = signedInUser?.username;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = `
      query chat {
        chat(username: "${userId}") {
          id
          name
          members {
            name
            username
          }
        }
      }
    `;
    graphQLClient.request(query).then(data => {
      setChats(data.chat);
      setSelectedChatId(data.chat[0]);
    });
  }, [signedInUser]);

  // fetch messages
  useEffect(() => {
    if (!selectedChatId) return;

    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = `query message { message(id: "${selectedChatId?.id}" ) { content, sender } }`;
    graphQLClient.request(query).then(data => {
      setMessages(data.message);
    });
  }, [selectedChatId, signedInUser]);

  return (
    <Layout sidebar={<ChatList setSelectedChatId={setSelectedChatId} chats={chats} />}>
      <MessageList messages={messages} />
    </Layout>
  );
}
