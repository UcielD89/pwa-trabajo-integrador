import { Router } from 'express';
import { getAllProductosHandler, getProductoByIdHandler } from '../controllers/productosController.js';

const router = Router();

router.get('/', getAllProductosHandler);
router.get('/:id', getProductoByIdHandler);

export default router;
