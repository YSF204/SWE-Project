import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Public routes
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

export default router;
