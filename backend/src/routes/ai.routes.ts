import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { analyzeTicketController } from '../controllers/ai.controller.js';
const router = Router(); router.post('/analyze', authenticate, analyzeTicketController); export default router;
