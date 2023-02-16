import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import {Credentials, SignInPayload } from './schema';
import {pool} from '../db';
import { SessionUser } from "@/types/custom";


export interface User {
  username: string,
  name: string,
  email: string,
  roles: string[],
  password: string
}

export class AuthService {
  async getUser(username: string): Promise<User|undefined> {
    const select = "Select * FROM member WHERE username = $1";
    const query = {
      text: select,
      values: [`${username}`],
    };
    const {rows} = await pool.query(query);
    if (rows[0]){
      const user:User = rows[0]['data'];
      user['username'] = rows[0]['username'];
      return user;
    } else {
      return undefined;
    }
  }

  public async signin(credentials: Credentials): Promise<SignInPayload>  {
    return new Promise((resolve, reject) => {
      this.getUser(credentials.username)
        .then((user) => {
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            const accessToken = jwt.sign(
              {email: user.email, name: user.name, roles: user.roles, username: user.username,}, 
              process.env.SECRET, {
                expiresIn: '30m',
                algorithm: 'HS256'
              });
            resolve({
              username: user.username,
              accessToken: accessToken,
              name: user.name
            });
          } else {
            reject(new Error("Unauthorised"));
          }
        });
    });
  }

  public async check(authHeader?: string, roles?: string[]): Promise<SessionUser>  {
    return new Promise((resolve, reject) => {
      if (!authHeader) {
        reject(new Error("Unauthorised"));
      }
      else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, user) => {
          const newUser: User = user as User
          if (err) {
            reject(err);
          } else if (roles){
            for (const role of roles) {
              if (!newUser.roles || !newUser.roles.includes(role)) {
                reject(new Error("Unauthorised"));
              }
            }
          }
          resolve({email: newUser.email, name: newUser.name, username: newUser.username});
        });
      }
    });
  }
}
