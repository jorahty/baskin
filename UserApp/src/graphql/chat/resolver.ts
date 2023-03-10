import { Authorized, Args, Resolver, Query, Mutation } from 'type-graphql';
import { Chat, ChatArgs, NewChat } from './schema';
import { ChatService } from './service';

@Resolver()
export class ChatResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Chat])
  async chat(@Args() args: ChatArgs): Promise<Chat[]> {
    return new ChatService().list(args.username);
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Chat)
  async addChat(@Args() { name }: NewChat): Promise<Chat> {
    return new ChatService().add(name);
  }
}
