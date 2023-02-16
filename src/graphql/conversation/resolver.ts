import { Args, Resolver, Query } from "type-graphql";
import { Conversation, ConversationArgs } from "./schema";
import { ConversationService } from "./service";


@Resolver()
export class ConversationResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Conversation])
  async conversation(@Args() args: ConversationArgs): Promise<Conversation[]> {
    return new ConversationService().list(args.username);
  }
}