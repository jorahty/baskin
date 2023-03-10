import { User, NewUser, SignUpPayload } from './schema';
import queryGQL from '../../queryGQL';

export class UserService {
  public async list(username?: string, email?: string): Promise<User[]> {
    let query = `query listUser { user`;
    if (username || email){
      query += `(`;
      query += username ? ` username: "${username}"` : ``;
      query += email ? ` email: "${email}"` : ``;
      query += `)`;
    }
    query += `{email, username, name}}`;
    const data = await queryGQL(
      'http://localhost:4000/graphql',
      query,
    );
    return data.user;
  }

  public async add(newMember: NewUser): Promise<SignUpPayload> {
    const data = await queryGQL(
      'http://localhost:4000/graphql',
      `mutation addNewUser { addUser (input: {
        username: "${newMember.username}",
        email: "${newMember.email}",
        password: "${newMember.password}"}
        ) { name, email, username } }`,
    );
    return data.addUser;
  }

  // public async updateUsername(request: Request, newName: string): Promise<User> {
  //   const data = await queryGQL(
  //     'http://localhost:4000/graphql',
  //     `mutation changeUsername { updateUsername (
  //       username: "${request.user.username}"
  //       newName: "${newName}"
  //       ) { name, username, email } }`,
  //   );
  //   return data.updateUsername;
  // }

  // public async updateEmail(request: Request, newEmail: string): Promise<User> {
  //   const data = await queryGQL(
  //     'http://localhost:4000/graphql',
  //     `mutation changeEmail { updateEmail (
  //       username: "${request.user.username}"
  //       newEmail: "${newEmail}"
  //       ) { name, username, email } }`,
  //   );
  //   return data.updateEmail;
  // }
}
