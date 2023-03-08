import { Arg, Args, Resolver, Query, Authorized, Mutation, Ctx } from 'type-graphql';
import { Message, MessageArgs, NewMessage } from './schema';
import { MessageService } from './service';
import type { Request } from 'next';

@Resolver()
export class MessageResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Message])
  async message(@Args() args: MessageArgs): Promise<Message[]> {
    return new MessageService().list(args.id);
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Message)
  async sendMessage(
    @Arg('message') { chat_id, content }: NewMessage,
    @Ctx() request: Request
  ): Promise<Message> {
    return new MessageService().send(chat_id, request.user.username, content);
  }
}
