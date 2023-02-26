import { Body, Controller, Get, Path, Post, Response, Route, Security, SuccessResponse } from 'tsoa';
import { ImageService } from './imageService';
import express from 'express';

@Route('image')
export class ImageController extends Controller {
  @Get('{fileName}')
  @Security('jwt', [])
  public async getImage(@Path() fileName: string) {
    return await new ImageService().getImage(fileName);
  }
}
