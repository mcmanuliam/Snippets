import express from 'express';
import authRoutes from './auth.routes';
import snippetsRoutes from './snippet.routes';
import userRoutes from './user.routes';
import platformRoutes from './platform.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/snippet', snippetsRoutes);
router.use('/platform', platformRoutes);

export default router;
