import { Router } from 'express';
import produtoController from '../controllers/produto.controller.js';
import uploadImagem from "../middlewares/produto.middlewares.js";

const produtoRoutes = Router();

produtoRoutes.post('/produtos/images', produtoController.criarProduto);
produtoRoutes.get('/produtos', produtoController.buscarTodosProdutos);
produtoRoutes.get('/produtos/:idProduto', produtoController.buscarProdutoPorID);
produtoRoutes.post('/produtos', produtoController.criarProduto);
produtoRoutes.put('/produtos/:idProduto', produtoController.atualizarProduto);
produtoRoutes.delete('/produtos/:idProduto', produtoController.excluirProduto);


export default produtoRoutes;