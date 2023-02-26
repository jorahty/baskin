import { Body, Controller, Post, Response, Route } from 'tsoa';

@Route('login')
export class AuthController extends Controller {
  @Post()
  @Response('401', 'Unauthorised')
  public async login(): Promise<boolean | undefined> {
    return true;
  }
}
