import { AuthChecker } from 'type-graphql';

import { AuthService } from './service';

type ContextType = any; // eslint-disable-line @typescript-eslint/no-explicit-any

async function authChecker(context: ContextType, authHeader: string): Promise<boolean> {
  try {
    context.user = await new AuthService().check(authHeader);
  } catch (err) {
    return false;
  }
  return true;
}

export const nextAuthChecker: AuthChecker<ContextType> = async ({ context }) => {
  return await authChecker(context, context.req.headers.authorization);
};
