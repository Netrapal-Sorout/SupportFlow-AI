import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getAnalyticsController } from '../controllers/analytics.controller.js';
const router = Router(); router.get('/', authenticate, getAnalyticsController); export default router;
