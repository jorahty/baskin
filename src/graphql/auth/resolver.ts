import { Query, Resolver, Args, Mutation, Arg } from "type-graphql"

import { Credentials, SignInPayload, NewUser, SignUpPayload } from "./schema"
import { AuthService } from "./service"

@Resolver()
export class AuthResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => SignInPayload)
  async login(
    @Args() credentials: Credentials,
  ): Promise<SignInPayload> {
    return new AuthService().login(credentials);
  }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Mutation(returns => SignUpPayload)
  async signUp(
      @Arg("input") input: NewUser,
  ): Promise<SignUpPayload> {
    return new AuthService().add(input);
  }
  

}
