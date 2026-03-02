import pool from "../config/db.js";

const produtoModel = {
    SelecionaTodosProdutos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionaProdutoPorID: async (id) => {
        const sql = 'SELECT * FROM produtos WHERE idProdutos=?;';
        const [rows] = await pool.query(sql, [id]);
        return rows;
    },

    InserirProduto: async (pIdCategoria, pNomeProduto, pValorProduto, pVinculoImage) => {
        const sql = 'INSERT INTO produtos (idCategoria, nomeProduto, valorProduto, vinculoImage) VALUES (?,?,?,?);';
        const values = [pIdCategoria, pNomeProduto, pValorProduto, pVinculoImage];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    alterarProduto: async (pID,  pNomeProduto, pValorProduto, pVinculoImage) => {
        const sql = 'UPDATE produtos SET nomeProduto=?, valorProduto=?, vinculoImage=? WHERE idProdutos=?;';
        const values = [pNomeProduto, pValorProduto, pVinculoImage, pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deletarProduto: async (pID) => {
        const sql = "DELETE FROM produtos WHERE idProdutos=?;";
        const values = [pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
}

export default produtoModel;