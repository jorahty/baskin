import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Chat } from '@/graphql/chat/schema';
import ChatList from '../../components/chat/list';
import Layout from '../../components/layout/Layout';
import MessageList from '../../components/message/list';
import { useAppContext } from '../../context';
import queryGQL from '../../queryQGL';

export default function MessagesPage() {
  const { signedInUser } = useAppContext();
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState<Chat>();

  // Fetch chats
  useEffect(() => {
    if (!signedInUser) return;
    queryGQL(
      'http://localhost:3000/api/graphql',
      `query chat {
        chat(username: "${signedInUser?.username}") {
          id, name, members { name, username }
        }
      }`,
      signedInUser?.accessToken,
    ).then(data => {
      setChats(data.chat);

      // Select chat with id from URL path
      const selected = data.chat.find(
        (chat: Chat) => chat.id === router.query.id
      );

      if (selected) {
        setSelectedChat(selected);
      } else {
        router.push(data.chat[0].id);
      }
    });
  }, [signedInUser, router.query.id, router]);

  // Fetch messages
  useEffect(() => {
    if (!selectedChat) return;
    queryGQL(
      'http://localhost:3000/api/graphql',
      `query message { message(id: "${selectedChat?.id}" ) { content, sender } }`,
      signedInUser?.accessToken,
    ).then(data => {
      setMessages(data.message);
    });
  }, [selectedChat, signedInUser]);

  return (
    <Layout
      sidebar={
        <ChatList chats={chats} selectedChat={selectedChat}/>
      }
    >
      <MessageList messages={messages}/>
    </Layout>
  );
}
