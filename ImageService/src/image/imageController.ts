import { Response, Controller, Post, Route, UploadedFiles } from 'tsoa';
import { ImageService } from './imageService';

@Route('image')
export class ImageController extends Controller {
  @Post()
  @Response('400', 'Unsupported file type')
  public async createImages(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void|string[]> {
    // Define supported file types
    const supported = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
    ];

    // Check if any of the files are unsupported
    for (const file of files) {
      if (supported.includes(file.mimetype) === false) {
        return this.setStatus(400);
      }
    }

    // Write files to disk and return corresponding array of URLs
    return new ImageService().create(files);
  }
}
