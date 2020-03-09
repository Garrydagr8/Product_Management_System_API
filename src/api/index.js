//changes done
const express = require('express');
import { productRouter } from './resources/product';
import { userRouter } from './resources/user/user.router';
import { inventoryRouter } from './resources/inventory';

export const restRouter = express.Router();
restRouter.use('/products', productRouter);
restRouter.use('/users', userRouter);
restRouter.use('/inventory', inventoryRouter);