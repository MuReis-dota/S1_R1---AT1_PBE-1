import pool from "../config/db.js";

const categoriaModel = {

    SelecionaTodosCategoria: async () => {
        const sql = 'SELECT * FROM Categoria;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionaCategoriaPorID: async (id) => {
        const sql = 'SELECT * FROM Categoria WHERE idCategoria=?;';
        const [rows] = await pool.query(sql, [id]);
        return rows;
    },

    InserirCategoria: async (pDescricao, pData) => {
        const sql = 'INSERT INTO Categoria (descricaoCategoria, dataCategoria) VALUES (?,?);';
        const values = [pDescricao, pData];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    alterarCategoria: async (pID, pDescricao, pData) => {
        const sql = 'UPDATE Categoria SET descricaoCategoria=?, dataCategoria=? WHERE idCategoria=?;';
        const values = [pDescricao, pData, pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deletarCategoria: async (pID) => {
        const sql = "DELETE FROM Categoria WHERE idCategoria=?;";
        const values = [pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    
}

export default categoriaModel;