import { AuthChecker } from "type-graphql"
import type { Request } from 'next'

import { AuthService } from "./service"

async function authChecker(context: Request, authHeader: string, roles: string[]): Promise<boolean> {
  try {
    context.user = await new AuthService().check(authHeader, roles)
  } catch (err) {
    return false
  }
  return true
}

export const nextAuthChecker: AuthChecker<Request> = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { root, args, context, info }, roles,) => 
{
  return await authChecker(context, context.req.headers.authorization, roles)
};
