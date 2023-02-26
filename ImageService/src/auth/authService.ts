export class AuthService {
  public async check(authHeader?: string, scopes?: string[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log(authHeader);
      if (!authHeader) {
        reject(new Error('Unauthorised'));
      } else {
        resolve(true);
        // const token = authHeader.split(' ')[1];
        //
        // jwt.verify(token, secrets.accessToken, (err: any, user: any) => {
        //   if (err) {
        //     reject(err);
        //   }
        //
        //   if (!user.isRoot && !scopes?.includes('all')) {
        //     reject(new Error('Unauthorised'));
        //   }
        //
        //   resolve(user);
        // });
      }
    });
  }
}
