import { Args, Resolver, Query } from 'type-graphql';
import { Message, MessageArgs } from './schema';
import { MessageService } from './service';

@Resolver()
export class MessageResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Message])
  async message(@Args() args: MessageArgs): Promise<Message[]> {
    return new MessageService().list(args.id);
  }
}
