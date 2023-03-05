import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { Credentials, SignInPayload } from './schema';
import request, { gql } from 'graphql-request';

export interface User {
  username: string;
  name: string;
  email: string;
  roles: string[];
  password: string;
}

export class AuthService {
  async getUser(username: string): Promise<User | undefined> {
    const query = gql`query GetUser { 
      user (username: "${username}") 
      { email, name, username, password, roles } 
    }`;
    const data = await request(
      'http://localhost:4000/graphql',
      query,
    );
    return data.user[0];
  }

  public async signin(credentials: Credentials): Promise<SignInPayload> {
    return new Promise((resolve, reject) => {
      this.getUser(credentials.username).then(user => {
        if (user && bcrypt.compareSync(credentials.password, user.password)
            && user.roles.find(role => role == 'admin' || role == 'moderator')) {
          const accessToken = jwt.sign(
            { email: user.email, name: user.name, roles: user.roles, username: user.username },
            process.env.ACCESS_TOKEN as string,
            {
              expiresIn: '30m',
              algorithm: 'HS256',
            }
          );
          resolve({
            username: user.username,
            accessToken: accessToken,
            name: user.name,
          });
        } else {
          reject(new Error('Unauthorised'));
        }
      });
    });
  }
}
