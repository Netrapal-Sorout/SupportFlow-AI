import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { createCustomerController, getCustomerController, listCustomersController, updateCustomerController } from '../controllers/customer.controller.js';

const router = Router();
router.use(authenticate);
router.get('/', listCustomersController);
router.post('/', createCustomerController);
router.get('/:id', getCustomerController);
router.patch('/:id', updateCustomerController);
export default router;
