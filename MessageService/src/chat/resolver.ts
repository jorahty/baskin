import { Args, Resolver, Query } from 'type-graphql';
import { Chat, ChatArgs } from './schema';
import { ChatService } from './service';

@Resolver()
export class ChatResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Chat])
  async chat(@Args() args: ChatArgs): Promise<Chat[]> {
    return new ChatService().list(args.username);
  }
}
