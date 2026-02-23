const express = require('express');
const categoriaRoutes = express.Router();

const {categoriaController} = require('../controllers/categoria.controller');

produtoRoutes.get('/categorias', categoriaController.buscarTodasCategorias);
produtoRoutes.get('/produtos/:idProduto', categoriaController.buscarCategoriaPorID);
produtoRoutes.post('/produtos', categoriaController.incluirCategoria);
produtoRoutes.put('/produtos/:idProduto', categoriaController.atualizarCategoria);
produtoRoutes.delete('/produtos/:idProduto', categoriaController.excluirCategoria);


module.exports = {categoriaRoutes};