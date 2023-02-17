import { Query, Resolver, Args } from 'type-graphql';

import { Credentials, SignInPayload } from './schema';
import { AuthService } from './service';

@Resolver()
export class AuthResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => SignInPayload)
  async signin(@Args() credentials: Credentials): Promise<SignInPayload> {
    return new AuthService().signin(credentials);
  }
}
