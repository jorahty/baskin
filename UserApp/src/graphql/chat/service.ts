import { Chat } from './schema';
import request, { gql } from 'graphql-request';

export class ChatService {
  public async list(username: string): Promise<Chat[]> {
    const chatQuery = gql`
      query ListChats($username: String) {
        chat(username: $username) {
          id
          name
          members {
            username
          }
        }
      }
    `;

    const { chat: chats } = await request('http://localhost:3014/graphql', chatQuery, { username });

    for await (const chat of chats) {
      const accountQuery = gql`
        query getAccountName($username: String) {
          user(username: $username) {
            name
          }
        }
      `;

      for await (const member of chat.members) {
        const { user } = await request('http://localhost:3011/graphql', accountQuery, {
          username: member.username,
        });
        member.name = user[0].name;
      }
    }

    return chats;
  }
}
