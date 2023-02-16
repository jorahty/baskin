import ConversationList from "../components/conversation/list";
import Layout from "../components/layout/Layout";

import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import MessageList from "../components/message/list";
import {useAppContext} from "../context";

export default function MessagesPage() {
  const { signedInUser } = useAppContext();

  const [conversations, setConversations] = useState([]);
  const [messages,setMessages] = useState([]);
  const [curConvo, setCurConvo] = useState<{id: string}|undefined>();

  // get the real array
  useEffect(() => {
    // fetch them from the database using the user's id
    const bearerToken = signedInUser?.accessToken
    const userId = signedInUser?.username;
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
    // const graphQLClient = new GraphQLClient('/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
    const query = `query conversation { conversation(username: "${userId}" ) { id } }`;
    graphQLClient.request(query).then(data => {
      setConversations(data.conversation);
      setCurConvo(data.conversation[0]);
    });


  }, [signedInUser]);

  // Updates messages
  useEffect(()=>{
    const bearerToken = signedInUser.accessToken
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
    // const graphQLClient = new GraphQLClient('/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
    const query = `query message { message(id: "${curConvo?.id}" ) { content } }`;
    graphQLClient.request(query).then(data => {
      setMessages(data.message);
    });
  },[curConvo, signedInUser])


  return (
    <Layout
      sidebar={
        <ConversationList conversations={conversations}/>
      }
    >
      <MessageList messages = {messages}/>
    </Layout>
  );
}
