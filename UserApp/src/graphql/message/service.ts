import { Message } from './schema';
import request, { gql } from 'graphql-request';

export class MessageService {
  public async list(id: string): Promise<Message[]> {
    const query = gql`
      query listMessages($id: String!) {
        message(id: $id) {
          content
          sender
        }
      }
    `;

    const { message: messages } = await request('http://localhost:3014/graphql', query, { id });
    return messages;
  }
}
