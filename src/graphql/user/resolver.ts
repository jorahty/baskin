import { Args, Query, Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { User, UserArgs, NewUser, SignUpPayload } from './schema';
import { UserService } from './service';
import type { Request } from 'next';

@Resolver()
export class UserResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [User])
  async user(@Args() { username }: UserArgs): Promise<User[]> {
    return new UserService().list(username);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => SignUpPayload)
  async addUser(@Arg('input') input: NewUser): Promise<SignUpPayload> {
    return new UserService().add(input);
  }

  @Authorized('member')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => User)
  async updateUsername(
    @Arg('newName') newName: string,
    @Ctx() request: Request
  ): Promise<User> {
    // check if username is already taken
    // check if caller is the 
    return new UserService().updateUsername(request, newName);
  }
}
