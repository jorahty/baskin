import { Query, Resolver, Args } from "type-graphql"

import { Credentials, UserAuth } from "./schema"
import { AuthService } from "./service"

@Resolver()
export class AuthResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => UserAuth)
  async login(
    @Args() credentials: Credentials,
  ): Promise<UserAuth> {
    return new AuthService().login(credentials);
  }

}
