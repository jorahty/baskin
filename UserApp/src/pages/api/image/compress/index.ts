import { NextApiRequest, NextApiResponse } from 'next';
import { ImageResolver } from '../../../../pages/api/image/resolver';
import formidable from 'formidable';

const form = formidable({ multiples: true }); // multiples means req.files will be an array

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function compression(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result = await new ImageResolver().compressImage(data.files.file);

  res.status(201);
  res.send(result);
  res.end();
}
