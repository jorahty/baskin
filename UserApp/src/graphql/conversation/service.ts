import { pool } from '../db';
import { Conversation } from './schema';

export class ConversationService {
  public async list(username: string): Promise<Conversation[]> {
    const select = `SELECT * FROM conversation where id IN(
                SELECT conversation_id FROM conversation_user where 
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
