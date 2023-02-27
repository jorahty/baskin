import { Response, Controller, Post, Route, UploadedFiles, SuccessResponse, Delete, Path } from 'tsoa';
import { ImageService } from './imageService';

@Route('image')
export class ImageController extends Controller {
  @Post()
  @SuccessResponse('201', 'Image created')
  @Response('415', 'Unsupported Media Type')
  public async createImages(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void|string[]> {
    // Define supported media types
    const supported = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
    ];

    // Check if any of the files are unsupported
    for (const file of files) {
      if (supported.includes(file.mimetype) === false) {
        return this.setStatus(415);
      }
    }

    // Write files to disk and return corresponding array of URLs
    return new ImageService().create(files);
  }

  @Delete('{id}')
  public async deleteImage(
    @Path() id: string,
  ): Promise<void> {
    new ImageService().delete(id);
  }
}