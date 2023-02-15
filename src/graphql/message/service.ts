import { pool } from "../db";
import { Message } from "./schema";

export class MessageService{
  public async list(id: string): Promise<Message[]>{
        
    const  select = `SELECT data || jsonb_build_object('id', id) AS message FROM message WHERE conversation_id = $1`;
        
    const query = {
      text: select,
      values: [id]
    };
    const { rows } = await pool.query(query);
    console.log(rows);
    return rows.map(row => row.message);
  }
}