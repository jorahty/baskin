import ChatList from '../components/chat/list';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import MessageList from '../components/message/list';
import { useAppContext } from '../context';
import queryGQL from '../queryQGL';
import { useTranslation } from 'react-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
    },
  };
};

export default function MessagesPage() {
  const { signedInUser } = useAppContext();

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState<{ id: string }|undefined>();

  const { t } = useTranslation('common');

  // fetch chats
  useEffect(() => {
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
      setSelectedChatId(data.chat[0]);
    });
  }, [signedInUser]);

  // fetch messages
  useEffect(() => {
    if (!selectedChatId) return;
    queryGQL(
      'http://localhost:3000/api/graphql',
      `query message { message(id: "${selectedChatId?.id}" ) { content, sender } }`,
      signedInUser?.accessToken,
    ).then(data => {
      setMessages(data.message);
    });
  }, [selectedChatId, signedInUser]);

  return (
    <Layout sidebar={<ChatList setSelectedChatId={setSelectedChatId} chats={chats} />}>
      <MessageList messages={messages} />
    </Layout>
  );
}
