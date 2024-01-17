import express from 'express';

import isAdmin from '../../middlewares/isAdmin.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';
import validateBody from '../../middlewares/validateBody.js';
import validateParams from '../../middlewares/validateParams.js';

import {
  delete_params_productSchema,
  get_params_productSchema,
  post_productSchema,
  put_params_productSchema,
  put_productSchema,
} from '../../helpers/validationSchemas/productSchemas.js';

import { Products } from '../../controllers/products/index.js';

export const productsRouter = express.Router();

// method.(path, (middlewares), controller to be run when the endpoint is hit)

// GET ---------------------------
productsRouter.get('/', Products.GetController.getProducts);
productsRouter.get(
  '/:id',
  (req, res, next) => validateParams(req, res, next, get_params_productSchema),
  Products.GetController.getProduct,
);

// POST ---------------------------
productsRouter.post(
  '/',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateBody(req, res, next, post_productSchema),
  Products.PostController.postProduct,
);

// PUT ----------------------------
productsRouter.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  (req, res, next) => validateParams(req, res, next, put_params_productSchema),
  (req, res, next) => validateBody(req, res, next, put_productSchema),
  Products.PutController.putProduct,
);

// DELETE -------------------------
productsRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  (req, res, next) =>
    validateParams(req, res, next, delete_params_productSchema),
  Products.DeleteController.deleteProduct,
);
