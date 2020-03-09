//changes done
const express = require('express');
const passport = require('passport');
import inventoryController from './inventory.controller';

export const inventoryRouter = express.Router();
inventoryRouter
    .route('/')
    .post(passport.authenticate('jwt', { session: false }), inventoryController.create)
    .get(passport.authenticate('jwt', { session: false }), inventoryController.findAll);