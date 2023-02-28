import path from 'path';
import fs from 'fs';
import supertest from 'supertest';

export async function addImage(request: supertest.SuperTest<supertest.Test>, filePath: string) {
  await request
    .post('/api/v0/image')
    .set('accept', 'application/json')
    .set('Content-Type', 'multipart/form-data')
    .attach('files', filePath)
    .expect(201)
    .then(res => {
      expect(res.body).toBeDefined();
      expect(res.body).toHaveLength(1);
      const newImageUrls: string[] = res.body;

      // Delete after done
      newImageUrls.map(id => {
        fs.unlinkSync(path.resolve(__dirname, '../../') + `/public/${id}.jpeg`);
      });
    });
}
