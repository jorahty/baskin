/*
#######################################################################
#
# Copyright (C) 2022-2023 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without 
# the express written permission of the copyright holder.
#
#######################################################################
*/

import {
  Body,
  Controller,
  Post,
  Response,
  Route,
} from 'tsoa';

import { Account, Credentials } from '.';
import { AccountService } from './service';

@Route('account')
export class AccountController extends Controller {
  @Post()
  @Response('404', 'Unknown')
  public async get(
    @Body() credentials: Credentials,
  ): Promise<Account|undefined> {
    return new AccountService().get(credentials)
      .then(async (account: Account|undefined): Promise<|Account|undefined> => {
        if (!account) {
          this.setStatus(404)
        }
        return account
      });
  }
}

