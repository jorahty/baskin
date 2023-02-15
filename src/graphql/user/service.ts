import { User, NewUser, SignUpPayload } from "./schema";
import { pool } from "../db";
import { hashSync } from 'bcrypt';

export class UserService {
  public async list(username: string): Promise<User[]> {
    let select = `
      SELECT jsonb_build_object(
        'username', username,
        'name', data->>'name',
        'email', data->>'email'
      ) as member FROM member
    `;
    select += username ? ` WHERE username = $1` : ``;
    const query = {
      text: select,
      values: username ? [username] : [],
    };
    const { rows } = await pool.query(query);
    return rows.map((row) => row.member);
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
