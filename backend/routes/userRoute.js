import express from 'express';
import { authUser, login, logout, register } from '../controllers/userController.js';
import isAuth from '../middleware/isAuth.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/authUser', isAuth, authUser);
userRouter.get('/logout', isAuth, logout);

export default userRouter;