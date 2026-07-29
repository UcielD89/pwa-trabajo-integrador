import { Router } from 'express';
import {
  getAllProductosHandler,
  getProductoByIdHandler,
  searchProductosHandler,
} from '../controllers/productosController.js';

const router = Router();

router.get('/', getAllProductosHandler);
router.get('/search', searchProductosHandler);
router.get('/:id', getProductoByIdHandler);

export default router;
