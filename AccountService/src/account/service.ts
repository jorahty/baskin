import { Account, Credentials } from '.';
import { pool } from '../db';

export class AccountService {
  public async get(creds: Credentials): Promise<Account|undefined> {
    let select = 
      ` SELECT data - 'pwhash' || jsonb_build_object('id', id)` +
      ` AS account FROM account` +
      ` WHERE data->>'username' = $1` +
      ` AND data->>'pwhash' = crypt($2,'87')`
    const query = {
      text: select,
      values: [creds.username, creds.password],
    };
    const {rows} = await pool.query(query)
    return rows.length === 1 ? rows[0].account : undefined
  }
}