import { Message } from './schema';
import request, { gql } from 'graphql-request';

export class MessageService {
  public async list(id: string): Promise<Message[]> {
    const query = gql`
      query listMessages($id: String!) {
        message(id: $id) {
          content
          sender
          date
        }
      }
    `;

    const data: { message: Message[] } = await request('http://localhost:4003/graphql', query, { id });
    return data.message;
  }

  public async send(chat_id: string, sender: string, content: string): Promise<Message> {
    const query = gql`
      mutation sendMessage($chat_id: String!, $sender: String!, $content: String!) {
        sendMessage(message: { chat_id: $chat_id, sender: $sender, content: $content }) {
          content
          sender
          date
        }
      }
    `;

    const data: { sendMessage: Message } = await request('http://localhost:4003/graphql', query, {
      chat_id,
      sender,
      content,
    });
    return data.sendMessage;
  }
}
