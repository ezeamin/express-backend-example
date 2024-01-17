import express from 'express';

import { authRouter } from './routers/authRouter.js';
import { usersRouter } from './routers/userRouter.js';
import { productsRouter } from './routers/productsRouter.js';

export const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/products', productsRouter);
mainRouter.use('/users', usersRouter);
