import { Router } from 'express';
import { getAllCategoriasHandler } from '../controllers/categoriasController.js';

const router = Router();

router.get('/', getAllCategoriasHandler);

export default router;
