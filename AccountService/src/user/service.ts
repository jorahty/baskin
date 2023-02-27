import { User, NewUser, SignUpPayload } from './schema';
import { pool } from '../db';
import { hashSync } from 'bcrypt';

export class UserService {
  public async list(username: string, email: string): Promise<User[]> {
    let select = `
      SELECT data || jsonb_build_object(
        'username', username
      ) as account FROM account
    `;
    select += username ? ` WHERE username = $1` : ``;
    select += email ? ` WHERE data->>'email' = $1` : ``;
    
    const query = {
      text: select,
      values: username ? [username] : email ? [email] : [],
    };
    const { rows } = await pool.query(query);
    return rows.map(row => row.account);
  }

  public async add(newMember: NewUser): Promise<SignUpPayload> {
    const insert = 'INSERT INTO account(username, data) VALUES ($1, $2) RETURNING *';
    const query = {
      text: insert,
      values: [
        `${newMember.username}`,
        {
          email: newMember.email,
          name: newMember.name,
          roles: ['member'],
          password: hashSync(newMember.password, 10),
          avatar: `https://robohash.org/${newMember.username}`,
        },
      ],
    };

    const { rows } = await pool.query(query);

    const user: SignUpPayload = {
      email: rows[0].data.email,
      name: rows[0].data.name,
      username: rows[0].username,
    };

    return user;
  }

  public async updateUsername(newName: string, username: string): Promise<SignUpPayload> {
    const update = 'UPDATE account SET username = $1 WHERE username = $2 RETURNING *';
    const query = {
      text: update,
      values: [newName, username],
    };
    const { rows } = await pool.query(query);
    const user: SignUpPayload = {
      username: rows[0].username,
      name: rows[0].data.name,
      email: rows[0].data.email,
    };
    return user;
  }

  public async updateEmail(newEmail: string, username: string): Promise<SignUpPayload> {
    const update = 'UPDATE account SET data = jsonb_set(data, $1, $2) WHERE username = $3 RETURNING *';
    const query = {
      text: update,
      values: ['{email}', `"${newEmail}"`, username],
    };
    const { rows } = await pool.query(query);
    const user: SignUpPayload = {
      username: rows[0].username,
      name: rows[0].data.name,
      email: rows[0].data.email,
    };
    return user;
  }
}
