import { pool } from '../db';
import { Message, MessageStat } from './schema';

export class MessageService {
  public async list(chat_id: string): Promise<Message[]> {
    const select = `
      SELECT data || jsonb_build_object('id', id) 
      AS message 
      FROM message 
      WHERE chat_id = $1
    `;

    const query = {
      text: select,
      values: [chat_id],
    };
    const { rows } = await pool.query(query);
    return rows.map(row => row.message);
  }

  public async send(chat_id: string, sender: string, content: string): Promise<Message> {
    const insert = `
      INSERT INTO message(chat_id, data)
      VALUES ($1, $2)
      RETURNING data || jsonb_build_object('id', id, 'chat_id', chat_id)
      AS message
    `;
    const date = new Date().toISOString();
    const query = {
      text: insert,
      values: [chat_id, { sender, content, date }],
    };
    const { rows } = await pool.query(query);
    return rows[0].message;
  }

  public async stat(): Promise<MessageStat>{
    const update = 'SELECT COUNT(*) FROM message';
    const query = {
      text: update
    };
    const { rows } = await pool.query(query);

    return rows[0]
  }
}
