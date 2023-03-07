import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Chat } from '../../graphql/chat/schema';
import ChatList from '../../components/chat/list';
import Layout from '../../components/layout/Layout';
import MessageList from '../../components/message/list';
import { useAppContext } from '../../context';
import queryGQL from '../../queryGQL';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AuthGuard from '../../components/common/AuthGuard';
import { Box, Divider, Stack } from '@mui/joy';
import MessageInput from '../../components/message/input';
import ChatHeader from '../../components/chat/header';

export const getServerSideProps: GetServerSideProps = async context => ({
  props: {
    ...(await serverSideTranslations((context.locale as string) ?? 'en', ['common'])),
  },
});

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
      signedInUser?.accessToken
    ).then(data => {
      setChats(data.chat);

      // Select chat with id from URL path
      const selected = data.chat.find((chat: Chat) => chat.id === router.query.id);

      if (selected) {
        setSelectedChat(selected);
      } else {
        router.push(data.chat[0].id, undefined, { shallow: true });
      }
    });
  }, [signedInUser, router.query.id, router]);

  // Fetch messages
  useEffect(() => {
    if (!selectedChat) return;
    queryGQL(
      'http://localhost:3000/api/graphql',
      `query message { message(id: "${selectedChat?.id}" ) { content, sender, date } }`,
      signedInUser?.accessToken
    ).then(data => {
      setMessages(data.message);
    });
  }, [selectedChat, signedInUser]);

  return (
    <AuthGuard>
      <Layout sidebar={<ChatList chats={chats} selectedChat={selectedChat} />}>
        <Stack direction="column" height="100%">
          <ChatHeader chat={selectedChat} />
          <Divider />
          <Box display="flex" height="100%" flexDirection="column-reverse" overflow="auto">
            <Box>
              <MessageList messages={messages} />
            </Box>
          </Box>
          <Box flexGrow={0} p={1.5}>
            <MessageInput />
          </Box>
        </Stack>
      </Layout>
    </AuthGuard>
  );
}
