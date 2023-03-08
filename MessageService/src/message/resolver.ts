import { Arg, Args, Mutation, Resolver, Query } from 'type-graphql';
import { Message, MessageArgs, NewMessage } from './schema';
import { MessageService } from './service';

@Resolver()
export class MessageResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Message])
  async message(@Args() args: MessageArgs): Promise<Message[]> {
    return new MessageService().list(args.id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Message)
  async sendMessage(@Arg('message') { chat_id, sender, content }: NewMessage): Promise<Message> {
    return new MessageService().send(chat_id, sender, content);
  }
}
