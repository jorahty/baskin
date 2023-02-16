import ConversationList from "../components/conversation/list";
import Layout from "../components/layout/Layout";

import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import MessageList from "../components/message/list";

export default function MessagesPage() {

 
  const [conversations, setConversations] = useState([]);
  const [messages,setMessages] = useState([]);
  const [curConvo, setCurConvo] = useState({});
  // get the real array
  useEffect(() => {
    // fetch them from the database using the user's id
    const item = localStorage.getItem('user')
    const user = JSON.parse(item)
    const bearerToken = user.accessToken
    const userId = user.username;
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
    

  }, [])
  
  useEffect(()=>{
    if(!curConvo.id){return;}
    const item = localStorage.getItem('user')
    const user = JSON.parse(item)
    const bearerToken = user.accessToken
    const graphQLClient = new GraphQLClient('http://localhost:3000/api/graphql', {
    // const graphQLClient = new GraphQLClient('/api/graphql', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
    console.log(curConvo.id);
    const query = `query message { message(id: "${curConvo.id}" ) { content } }`;
    graphQLClient.request(query).then(data => {
      setMessages(data.message);
    });
  },[curConvo])


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
