// import fetch from 'node-fetch';
// import FormData from 'form-data';
import fs from 'fs';
export class ImageResolver {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public async uploadImage(files: any | any[]) {
    const formData: FormData = new FormData();

    if (Array.isArray(files)) {
      files.map(picture => {
        const a = fs.readFileSync(picture.filepath);
        formData.append(
          'files',
          new Blob([a], {
            type: picture.mimetype,
          }),
          picture.name,
        );
      });
    } else {
      const image = fs.readFileSync(files.filepath);
      formData.append(
        'files',
        new Blob([image], {
          type: files.mimetype,
        }), files.name);
    }

    const imageData = await fetch('http://localhost:4001/api/v0/image', {
      method: 'POST',
      body: formData,
    });

    return await imageData.json();
  }

  public async removeImage(id: string | string[] | undefined) {
    return await fetch(`http://localhost:4001/api/v0/image/${id}`, {
      method: 'DELETE',
    });
  }

  public async compressImage(files: any) {
    const formData: FormData = new FormData();
    const image = fs.readFileSync(files.filepath);
    formData.append(
      'file',
      new Blob([image], {
        type: files.mimetype,
      }), files.name);

    const a = await fetch(
      'http://localhost:4001/api/v0/image/compress',
      {
        method: 'POST',
        body: formData,
      },
    );

    return a.json();
  }
}
