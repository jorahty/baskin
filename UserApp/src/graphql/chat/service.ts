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

    const data:{chat:Chat[]} = await request('http://localhost:4003/graphql', chatQuery, { username });

    for await (const chat of data.chat) {
      const accountQuery = gql`
        query getAccountName($username: String) {
          user(username: $username) {
            name
          }
        }
      `;

      for await (const member of chat.members) {
        const data:{user:{name:string}[]}
          = await request('http://localhost:4000/graphql', accountQuery, {
            username: member.username,
          });
        member.name = data.user[0].name;
      }
    }

    return data.chat;
  }
}
