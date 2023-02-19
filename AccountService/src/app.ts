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

import express, { 
  Express, 
  Router,
  Response as ExResponse, 
  Request as ExRequest, 
} from 'express';

import swaggerUi from 'swagger-ui-express';

import {RegisterRoutes} from "../build/routes";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v0/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  );
});

const router = Router();
RegisterRoutes(router);
app.use('/api/v0', router);

export default app;
