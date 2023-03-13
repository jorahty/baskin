import { StatPayload } from './schema';
import request, { gql } from 'graphql-request';

export class StatService {
  public async stat(): Promise<StatPayload>{
    let query = gql`
      query StatUsers {
        userStat {
          count
        }
      }
    `;

    let data = await request(
      'http://localhost:4000/graphql',
      query,
    );

    const user = data.userStat.count;

    query = gql`
      query StatMessages {
        messageStat {
          count
        }
      }
    `;

    data = await request(
      'http://localhost:4003/graphql',
      query,
    );

    const message = data.messageStat.count;

    query = gql`
      query StatChats {
        chatStat {
          count
        }
      }
    `;

    data = await request(
      'http://localhost:4003/graphql',
      query,
    );

    const chat = data.chatStat.count;

    query = gql`
      query StatAttributes {
        attributeStat {
          count
        }
      }
    `;

    data = await request(
      'http://localhost:4002/graphql',
      query,
    );

    const attribute = data.attributeStat.count;

    query = gql`
      query StatCategories {
        categoryStat {
          count
        }
      }
    `;

    data = await request(
      'http://localhost:4002/graphql',
      query,
    );

    const category = data.categoryStat.count;

    query = gql`
      query StatProducts {
        productStat {
          count
        }
      }
    `;

    data = await request(
      'http://localhost:4002/graphql',
      query,
    );

    const product = data.productStat.count;

    return {
      user: user,
      chat: chat,
      message: message,
      attribute: attribute,
      product: product,
      category: category,
    };
  }
}