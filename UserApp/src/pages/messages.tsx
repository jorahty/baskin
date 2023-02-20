import ChatList from '../components/chat/list';
import Layout from '../components/layout/Layout';

import { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import MessageList from '../components/message/list';
import { useAppContext } from '../context';

export default function MessagesPage() {
  const { signedInUser } = useAppContext();

  const [chats, setchats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [curConvo, setCurConvo] = useState<{ id: string } | undefined>();

  // get the real array
  useEffect(() => {
    // fetch them from the database using the user's id
    const bearerToken = signedInUser?.accessToken;
    const userId = signedInUser?.username;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = `query chat { chat(username: "${userId}" ) { id } }`;
    graphQLClient.request(query).then(data => {
      setchats(data.chat);
      setCurConvo(data.chat[0]);
    });
  }, [signedInUser]);

  // Updates messages
  useEffect(() => {
    if (!curConvo) return;

    const bearerToken = signedInUser?.accessToken;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const query = `query message { message(id: "${curConvo?.id}" ) { content } }`;
    graphQLClient.request(query).then(data => {
      setMessages(data.message);
    });
  }, [curConvo, signedInUser]);

  return (
    <Layout sidebar={<ChatList chats={chats} />}>
      <MessageList messages={messages} />
    </Layout>
  );
}
