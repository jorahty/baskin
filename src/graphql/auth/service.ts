import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {hashSync} from 'bcrypt';

import {Credentials, SignInPayload, SignUpPayload} from './schema';
import {pool} from '../db';

import secrets from '../../../data/secrets.json';

import { NewUser } from "./schema";

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

  public async login(credentials: Credentials): Promise<SignInPayload>  {
    return new Promise((resolve, reject) => {
      this.getUser(credentials.username)
        .then((user) => {
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            const accessToken = jwt.sign(
              {email: user.email, name: user.name, roles: user.roles}, 
              secrets.accessToken, {
                expiresIn: '30m',
                algorithm: 'HS256'
              });
            resolve({username: user.username, accessToken: accessToken});
          } else {
            reject(new Error("Unauthorised"));
          }
        });
    });
  }
  
  public async add(newMember: NewUser): Promise<SignUpPayload> {
    const insert = 'INSERT INTO member(username, data) VALUES ($1, $2) RETURNING *';
    const query = {
      text: insert,
      values: [`${newMember.username}`, {"email": newMember.email,"name": newMember.name, "roles": ["member"], "password": hashSync(newMember.password, 10)}]
    }

    const {rows} = await pool.query(query);
  
    const user:SignUpPayload = {'email': rows[0].data.email, 'name': rows[0].data.name, 'username': rows[0].username}
    
    return user;
  }
}
