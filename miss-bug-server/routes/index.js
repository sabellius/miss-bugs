import express from 'express';
import bugsRouter from './bugs.js';
import usersRouter from './users.js';

const router = express.Router();

router.use('/bugs', bugsRouter);
router.use('/users', usersRouter);

export default router;
