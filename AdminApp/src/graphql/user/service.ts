import { User, SignUpPayload } from './schema';
import request, { gql } from 'graphql-request';

export class UserService {
  public async list(username: string, email: string): Promise<User[]> {
    const mutation = gql`
      query ListUsers($username: String, $email: String) {
        user(username: $username, email: $email) {
          username, email, name, roles
        }
      }
    `;

    const data = await request(
      'http://localhost:4000/graphql',
      mutation,
      { username: username, email: email },
    );

    return data.user;
  }

  public async updateRoles(username: string, roles: string[]): Promise<SignUpPayload> {
    const mutation = gql`
      mutation UpdateRoles($input: UpdateRolesInput!) {
        updateRoles (input: $input){
          name, username, email
        }
      }
    `;

    const data = await request(
      'http://localhost:4000/graphql',
      mutation,
      { input: { username: username, roles: roles } },
    );

    return data.updateRoles;
  }
}
