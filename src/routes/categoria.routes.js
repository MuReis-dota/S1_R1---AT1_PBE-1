import { Router } from 'express';
import categoriaController from '../controllers/categoria.controller.js';

const categoriaRoutes = Router();

categoriaRoutes.get('/categoria', categoriaController.buscarTodasCategorias);
categoriaRoutes.get('/categoria/:idCategoria', categoriaController.buscarCategoriaPorID);
categoriaRoutes.post('/categoria', categoriaController.incluirCategoria);
categoriaRoutes.put('/categoria/:idCategoria', categoriaController.atualizarCategoria);
categoriaRoutes.delete('/categoria/:idCategoria', categoriaController.excluirCategoria);


export default categoriaRoutes;