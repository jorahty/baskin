import { Attribute, NewAttribute } from './schema';

import { pool } from '../db';

export class AttributeService {
  public async list(id?: string): Promise<Attribute[]>{
    let select = `SELECT data || jsonb_build_object('id', id, 'category', category_slug)
      AS attribute FROM attribute`;
    if (id) select += ' WHERE id = $1';
    const query = {
      text: select,
      values: id ? [id] : [],
    };
    const { rows } = await pool.query(query);
    return rows.map(row => row.attribute);
  }

  public async add(attribute: NewAttribute): Promise<Attribute> {
    const insert = `INSERT INTO attribute 
      (category_slug, data) 
      VALUES ($1, $2)
      RETURNING data || jsonb_build_object('id', id, 'category', category_slug) AS attribute`;

    const query = {
      text: insert,
      values: [attribute.category,
        { 
          name: attribute.name, 
          type: attribute.type,
          min: attribute.min,
          max: attribute.max,
          step: attribute.step,
          symbol: attribute.symbol,
          values: attribute.values,
        }
      ],
    };

    const { rows } = await pool.query(query);

    return rows.map(row => row.attribute)[0];
  }

  public async remove(id: string): Promise<Attribute> {
    const insert = `DELETE FROM attribute WHERE id = $1
      RETURNING data || jsonb_build_object('id', id, 'category', category_slug) AS attribute`;

    const query = {
      text: insert,
      values: [id],
    };

    const { rows } = await pool.query(query);

    return rows.map(row => row.attribute)[0];
  }
}