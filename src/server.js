import express from 'express';
import categoriaRoutes from './routes/categoria.routes.js';
import produtoController from './routes/produto.routes.js';
import path from 'path';
import 'dotenv/config';
import produtoRoutes from './routes/produto.routes.js';

const app = express();
app.use(express.json());

app.use('/', produtoRoutes)
app.use('/', categoriaRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
});