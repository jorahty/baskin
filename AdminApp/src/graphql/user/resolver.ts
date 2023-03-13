import { Args, Query, Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { User, UserArgs, SignUpPayload, UpdateRoles } from './schema';
import { UserService } from './service';

@Resolver()
export class UserResolver {
  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [User])
  async user(@Args() { username, email }: UserArgs): Promise<User[]> {
    return new UserService().list(username, email);
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => SignUpPayload)
  async updateRoles(
     @Arg('input') input: UpdateRoles
  ): Promise<SignUpPayload> {
    return new UserService().updateRoles(input.username, input.roles);
  }
}
