//no changes required
const express = require('express');
const passport = require('passport');
import userController from './user.controller';

export const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/me', passport.authenticate('jwt', { session: false }), userController.authenticate);