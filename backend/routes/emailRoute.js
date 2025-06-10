import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { createEmail, deleteEmail, getAllEmailById, getAllInboxEmail } from '../controllers/emailController.js';

const emailRouter = express.Router();

emailRouter.post('/create',isAuth,createEmail);
emailRouter.delete('/:id',isAuth,deleteEmail);
emailRouter.get('/getAllEmails',isAuth,getAllEmailById);
emailRouter.post('/getAllInboxEmails',isAuth,getAllInboxEmail);

export default emailRouter;