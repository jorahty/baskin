import { Args, Query, Resolver, Mutation, Arg } from 'type-graphql';
import { User, UserArgs, NewUser, SignUpPayload } from './schema';
import { UserService } from './service';

@Resolver()
export class UserResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [User])
  async user(@Args() { username, email }: UserArgs): Promise<User[]> {
    return new UserService().list(username, email);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => SignUpPayload)
  async addUser(@Arg('input') input: NewUser): Promise<SignUpPayload> {
    return new UserService().add(input);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @Mutation(returns => User)
  // async updateUsername(
  //   @Arg('newName') newName: string,
  //   @Ctx() request: Request
  // ): Promise<User> {
  //   return new UserService().updateUsername(request, newName);
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @Mutation(returns => User)
  // async updateEmail(
  //   @Arg('newEmail') newEmail: string,
  //   @Ctx() request: Request
  // ): Promise<User> {
  //   return new UserService().updateEmail(request, newEmail);
  // }
}
