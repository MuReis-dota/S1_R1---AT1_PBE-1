import categoriaModel from "../model/categoria.model.js";
import produtoModel from "../model/produto.model.js"

const produtoController = {
    upload: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Ops, arquivo não enviado' })
            }

            res.status(200).json({
                message: 'Upload concluido com sucesso',
                file: {
                    filename: req.file.filename,
                    size: req.file.size,
                    mimetype: req.file.mimetype,
                }
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })

        }
    },
    criarProduto: async (req, res) => {
        try {
            const { idCategoria, nome, valor, vinculoImagem} = req.body;

            if (!nome || nome.length < 3 || valor <= 0) {
                return res.status(400).json({ message: 'Dados inválidos' });
            }

            const resultado = await produtoModel.InserirProduto(idCategoria, nome, valor, vinculoImagem);

            if (resultado.affectedRows === 1 && resultado.insertId !== 0) {
                return res.status(201).json({
                    message: 'Registro incluído com sucesso',
                    id: resultado.insertId
                });
            } else {
                throw new Error('Ocorreu um erro ao incluir o registro');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Ocorreu um erro no servidor.',
                errorMessage: error.message
            });
        }
    },
    buscarTodosProdutos: async (req, res) => {
        try {
            const resultado = await produtoModel.SelecionaTodosProdutos();
            if (resultado.length === 0) { //verifica se o resultado é igual a 0(zero) ou não
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
        } catch (error) {
            console.error(error); //todo erro que tiver, vai aparecer para mim
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },
    buscarProdutoPorID: async (req, res) => {
        try {
            const id = Number(req.params.idCategoria);
            if (!id || !Number.isInteger(id)) {
                res.status(400).json({ message: 'Informe um identificador(ID) válido fazendo favor' })
            }
            const resultado = await produtoModel.selecionaProdutoPorID(id)
            res.status(200).json({ message: resultado })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },
    atualizarProduto: async (req, res) => {
        try {
            let idProduto = Number(req.params.idProduto);
            let { idCategoria, nome, valor, vinculoImagem } = req.body;

            if (!idCategoria || !nome || !valor || !isNaN(vinculoImagem)) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            };

            const novoProduto = await produtoModel.alterarProduto(idProduto)
            if (novoProduto.length === 0) {
                throw new error('Registro não localizado');
            }

            const novoNome = nome ?? novoProduto[0].nome;
            const novoValor = valor ?? novoProduto[0].valor;
            const novoVinculoImagem = vinculoImagem ?? novoProduto[0].vinculoImagem

            const resultado = await categoriaModel.alterarCategoria(idCategoria, novoNome, novoValor, novoVinculoImagem)

            if (resultado.changeDows === 0) {
                throw new error('Ocorreu um ero ao atualizar o produto');
            }
            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    },

    excluirProduto: async (req, res) => {
        try {
            const id = Number(req.params.idProduto);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'Forneça um ID válido' });
            }

            const produtoSelecionado = await produtoModel.deletarProduto(id);
            console.log
            if (produtoSelecionado.length === 0) {
                throw new Error("Registro não localizado");
            } else {
                const resultado = await produtoModel.deletarProduto(id);
                if (resultado.affectedRows === 1) {
                    res.status(200).json({ message: 'Produto excluído com sucesso', data: resultado });
                } else {
                    throw new Error("Não foi possível excluír o produto");
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

export default produtoController;