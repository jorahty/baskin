import { Args, Resolver, Query } from 'type-graphql';
import { Chat, ChatArgs } from './schema';
import { chatService } from './service';

@Resolver()
export class chatResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Chat])
  async chat(@Args() args: ChatArgs): Promise<Chat[]> {
    return new chatService().list(args.username);
  }
}
