import {
  Response,
  Controller,
  Post,
  Route,
  UploadedFiles,
  SuccessResponse,
  Delete,
  Path,
  UploadedFile,
} from 'tsoa';
import { ImageService } from './imageService';

@Route('image')
export class ImageController extends Controller {
  @Post('compress')
  @SuccessResponse('200', 'Image compressed')
  @Response('415', 'Unsupported Media Type')
  public async compressImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Express.Multer.File | void> {
    const supported = ['image/png', 'image/jpeg', 'image/webp'];

    if (supported.includes(file.mimetype) === false) {
      return this.setStatus(415);
    }

    return new ImageService()
      .compress(file)
      .then((file: Express.Multer.File | undefined) => {
        if (!file) return this.setStatus(415);
        return file;
      });
  }

  @Post()
  @SuccessResponse('201', 'Image created')
  @Response('415', 'Unsupported Media Type')
  public async createImages(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void | string[]> {
    // Define supported media types
    const supported = ['image/png', 'image/jpeg', 'image/webp'];

    // Check if any of the files are unsupported
    for (const file of files) {
      console.log(file.mimetype);
      if (supported.includes(file.mimetype) === false) {
        return this.setStatus(415);
      }
    }

    // Write files to disk and return corresponding array of URLs
    return new ImageService().create(files);
  }

  @Delete('{id}')
  @SuccessResponse(200, 'File deleted')
  @Response(404, 'Image not Found')
  public async deleteImage(@Path() id: string): Promise<void> {
    await new ImageService().delete(id).then((result: boolean) => {
      if (!result) this.setStatus(404);
    });
  }
}
