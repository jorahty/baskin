import { NextApiRequest, NextApiResponse } from 'next';
import { ImageResolver } from '../../../pages/api/image/resolver';
export default async function deleteImage(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await new ImageResolver().removeImage(req.query.id);
  res.status(201);
  res.end();
}
