import categoriaModel from "../model/categoria.model.js";

const categoriaController = {
    buscarTodasCategorias: async (req, res) => {
        try {
            const resultado = await categoriaModel.SelecionaTodosCategoria();
            if (resultado === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não tem dados nenhum' });
            }
            return res.status(200).json({message: resultado})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    buscarCategoriaPorID: async (req, res) => {
        try {
            const id = Number(req.params.idCategoria);
            if (!id || !Number.isInteger(id)) {
                res.status(400).json({ message: 'Informe um identificador(ID) válido fazendo favor' })
            }
            const resultado = await categoriaModel.selecionaCategoriaPorID(id)
            res.status(200).json({ message: resultado })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    incluirCategoria: async (req, res) => {
        try {
            const { descricao, data } = req.body;

            if (!String(descricao) || descricao.length < 3) {
                return res.status(400).json({ message: 'Dados invalidos' });
            }
            const resultado = await categoriaModel.InserirCategoria(descricao, data)

            if (resultado.affectedRows === 1 && resultado.insertId != 0) {
                res.status(201).json({ message: 'Registro incluido com sucesso', result: resultado })
            } else {
                throw new error('Ocorreu um erro ao incluir o registro');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },

    atualizarCategoria: async (req, res) => {
        try {
            let idCategoria = Number(req.params.idCategoria);
            let { descricao, data } = req.body;

            descricao = descricao.trim();

            if (!idCategoria || !descricao || !data || !isNaN(descricao) || descricao.trim().length < 3) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            };

            const novaCategoria = await categoriaModel.selecionaCategoriaPorID(idCategoria)
            if (novaCategoria.length === 0) {
                throw new error('Registro não localizado');
            }

            const novaDescricao = descricao ?? produtoAtual[0].descricao;
            const novaData = data ?? novaCategoria[0].data;

            const resultado = await categoriaModel.alterarCategoria(idCategoria, novaDescricao, novaData)

            if (resultado.changeDows === 0) {
                throw new error('Ocorreu um ero ao atualizar o produto');
            }
            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    },

    excluirCategoria: async (req, res) => {
        try {
            const id = Number(req.params.idCategoria);
            if(!id || !Number.isInteger(id)){
                return res.status(400).json({message: 'Forneça um ID válido'});
            }

            const categoriaSelecionada = await categoriaModel.selecionaCategoriaPorID(id);
            console.log
            if(categoriaSelecionada.length === 0){
                throw new Error("Registro não localizado");
            }else{
                const resultado = await categoriaModel.deletarCategoria(id);
                if(resultado.affectedRows === 1){
                    res.status(200).json({message: 'Produto excluído com sucesso', data:resultado});
                }else{
                    throw new Error("Não foi possível excluír o produto");
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};



export default categoriaController;