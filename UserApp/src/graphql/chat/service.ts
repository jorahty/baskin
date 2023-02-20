import { pool } from '../db';
import { Chat } from './schema';

export class chatService {
  public async list(username: string): Promise<Chat[]> {
    const select = `SELECT * FROM chat where id IN(
                SELECT chat_id FROM chat_member where 
                member_username = $1
            )`;

    const query = {
      text: select,
      values: [username],
    };
    const { rows } = await pool.query(query);
    return rows;
  }
}
