import { Args, Query, Resolver, Mutation, Arg  } from "type-graphql";

import { User, UserArgs, NewUser, SignUpPayload } from "./schema";
import { UserService } from "./service";

@Resolver()
export class UserResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [User])
  async user(@Args() { username }: UserArgs): Promise<User[]> {
    return new UserService().list(username);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => SignUpPayload)
  async signup(
    @Arg("input") input: NewUser,
  ): Promise<SignUpPayload> {
    return new UserService().add(input);
  }
}
