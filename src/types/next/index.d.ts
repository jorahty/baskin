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

import { SessionUser } from '../custom';

declare module 'next' {
  export interface Request {
    user: SessionUser;
  }
}

export {};
