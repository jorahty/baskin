import { pool } from '../db';

export class ImageService {
  public async getImage(id: string): Promise<any> {
    const select = 'SELECT * FROM product_image WHERE id=$1;';


    const query = {
      text: select,
      values: [id],
    };

    console.log(id);
    const a = await pool.query(query);
    console.log('is done');
    console.log(a);

    return true;
  }
}
