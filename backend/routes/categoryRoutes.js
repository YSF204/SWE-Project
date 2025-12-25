import express from 'express';
import categoryController from '../controllers/categoryController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

// Admin only routes
router.post('/', authenticate, requireAdmin, categoryController.create);
router.put('/:id', authenticate, requireAdmin, categoryController.update);
router.delete('/:id', authenticate, requireAdmin, categoryController.delete);

export default router;
