import {
  Controller,
  Post,
  Route,
  Response,
  Request,
  UploadedFile,
  UploadedFiles,
  FormField,
  SuccessResponse,
} from 'tsoa';
import { ImageService } from './imageService';
import express from 'express';
import multer from 'multer';

import fileUpload from 'express-fileupload';

@Route('images')
export class ImageController extends Controller {
  @Post()
  @SuccessResponse(201)
  public async postImage(@Request() request: Express.Request): Promise<string | undefined> {
    return new ImageService().postImage(request).then((res: string | undefined) => {
      console.log(res);
      if (!res) this.setStatus(400);
      return res;
    });
  }
}
