import { Router } from 'express';
import produtoRoutes from './produto.routes.js';
import clienteRoutes from './clienteRoutes.js';

const router = Router();

router.use('/', produtoRoutes);
router.use('/', clienteRoutes);

export default router;