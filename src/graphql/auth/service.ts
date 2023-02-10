import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import {Credentials, UserAuth} from './schema';
import {pool} from '../db';

import secrets from '../../../data/secrets.json';

interface User {
  name: string,
  email: string,
  roles: string[],
  password: string
}

export class AuthService {
  async getUser(email: string): Promise<User|undefined> {
    const select = "Select * FROM member WHERE email= $1"
    const query = {
      text: select,
      values: [`${email}`],
    };
    const {rows} = await pool.query(query);
    if (rows[0]){
      const user:User = rows[0]['data'];
      user['email'] = rows[0]['email'];
      return user;
    } else {
      return undefined;
    }
  }

  public async login(credentials: Credentials): Promise<UserAuth>  {
    return new Promise((resolve, reject) => {
      this.getUser(credentials.email)
        .then((user) => {
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            const accessToken = jwt.sign(
              {email: user.email, name: user.name, roles: user.roles}, 
              secrets.accessToken, {
                expiresIn: '30m',
                algorithm: 'HS256'
              });
            resolve({name: user.name, email: user.email, accessToken: accessToken});
          } else {
            reject(new Error("Unauthorised"));
          }
        });
    });
  }
}