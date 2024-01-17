import express from 'express';

import validateBody from '../../middlewares/validateBody.js';

import { post_authSchema } from '../../helpers/validationSchemas/authSchemas.js';

import { Auth } from '../../controllers/auth/index.js';

export const authRouter = express.Router();

// POST ---------------------------
authRouter.post(
  '/login',
  (req, res, next) => validateBody(req, res, next, post_authSchema),
  Auth.PostController.postLogin,
);
