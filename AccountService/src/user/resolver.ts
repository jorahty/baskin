import { Args, Query, Resolver, Mutation, Arg } from 'type-graphql';
import { User, UserArgs, NewUser, SignUpPayload, UpdateRoles, UserStat } from './schema';
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
  @Mutation(returns => SignUpPayload)
  async updateUsername(
    @Arg('newName') newName: string,
    @Arg('username') username: string
  ): Promise<SignUpPayload> {
    // check if username is already taken
    // check if caller is the
    return new UserService().updateUsername(newName, username);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => SignUpPayload)
  async updateEmail(
    @Arg('newEmail') newEmail: string,
    @Arg('username') username: string
  ): Promise<SignUpPayload> {
    return new UserService().updateEmail(newEmail, username);
  }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   @Mutation(returns => SignUpPayload)
  async updateRoles(
     @Arg('input') input: UpdateRoles
  ): Promise<SignUpPayload> {
    return new UserService().updateRoles(input.username, input.roles);
  }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   @Query(returns => UserStat)
   async userStat(): Promise<UserStat> {
     return new UserService().stat();
   }
}
