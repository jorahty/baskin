import { Args, Query, Resolver } from "type-graphql";

import { User, UserArgs } from "./schema";
import { UserService } from "./service";

@Resolver()
export class UserResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [User])
  async user(@Args() { username }: UserArgs): Promise<User[]> {
    return new UserService().list(username);
  }
}
