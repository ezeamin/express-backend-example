import express from 'express';

import isAdmin from '../../middlewares/isAdmin.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';
import validateBody from '../../middlewares/validateBody.js';
import validateParams from '../../middlewares/validateParams.js';

import {
  delete_params_userSchema,
  get_params_userSchema,
  post_userSchema,
  put_params_userSchema,
  put_userSchema,
} from '../../helpers/validationSchemas/userSchemas.js';

import { Users } from '../../controllers/users/index.js';

export const usersRouter = express.Router();

// GET -----------
usersRouter.get('/', isAuthenticated, isAdmin, Users.GetController.getUsers);
usersRouter.get(
  '/:id',
  isAuthenticated,
  (req, res, next) => validateParams(req, res, next, get_params_userSchema),
  Users.GetController.getUsers,
);

// POST -----------
usersRouter.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  Users.PostController.postUser,
);

// PUT -----------
usersRouter.put(
  '/:id',
  isAuthenticated,
  (req, res, next) => validateParams(req, res, next, put_params_userSchema),
  (req, res, next) => validateBody(req, res, next, put_userSchema),
  Users.PutController.putUser,
);

// DELETE -----------
usersRouter.delete(
  '/:id',
  isAuthenticated,
  (req, res, next) => validateParams(req, res, next, delete_params_userSchema),
  Users.DeleteController.deleteUser,
);
