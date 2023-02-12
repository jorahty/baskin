import { User } from "./schema";
import { pool } from "../db";

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
    console.log(rows);
    return rows.map((row) => row.member);
  }
}
