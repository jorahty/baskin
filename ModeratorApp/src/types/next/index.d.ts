import { SessionUser } from '../custom';

declare module 'next' {
  export interface Request {
    user: SessionUser;
  }
}

export {};
