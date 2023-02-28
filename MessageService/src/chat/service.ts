import { pool } from '../db';
import { Chat } from './schema';

export class ChatService {
  public async list(username: string): Promise<Chat[]> {
    const select = `
      SELECT 
        chat.id,
        chat.data->>'name' as name,
        jsonb_agg(
          jsonb_build_object(
            'username', chat_member.member_username
          ) ORDER BY chat_member.member_username
        ) as members
      FROM chat
      JOIN chat_member ON chat_member.chat_id = chat.id
      WHERE chat.id IN (
        SELECT chat_id FROM chat_member WHERE member_username = $1
      )
      GROUP BY chat.id, chat.data->>'name'
    `;
    const query = {
      text: select,
      values: [username],
    };
    const { rows } = await pool.query(query);
    return rows;
  }
}
