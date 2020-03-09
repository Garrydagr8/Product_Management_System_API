//changes done
const express = require('express');
const passport = require('passport');
import productController from './product.controller';
import { isAdmin } from '../../middlewares/is-admin';

export const productRouter = express.Router();
// 1.authenticated user can view all the songs
// 2.an admin can create, update, and delete product

const adminPolicy = [passport.authenticate('jwt', { session: false }), isAdmin];
productRouter
    .route('/')
    .post(adminPolicy, productController.create)
    .get(passport.authenticate('jwt', { session: false }), productController.findAll);

productRouter
    .route('/:id')
    .get(passport.authenticate('jwt', { session: false }), productController.findOne)
    .delete(adminPolicy, productController.delete)
    .put(adminPolicy, productController.update);