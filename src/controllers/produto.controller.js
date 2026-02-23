const { produtoModel } = require('../model/produto.model.js');

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
            const { idCategoria, nome, valor, vinculoImagem, data } = req.body;

            if (!nome || nome.length < 3 || valor <= 0) {
                return res.status(400).json({ message: 'Dados inválidos' });
            }

            const resultado = await produtoModel.inserirProduto(nome, valor, idCategoria, vinculoImagem, data);

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
            const resultado = await produtoModel.selecionarTodos();
            if (resultado.length === 0) { //verifica se o resultado é igual a 0(zero) ou não
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
        } catch (error) {
            console.error(error); //todo erro que tiver, vai aparecer para mim
            res.status(500).json({ message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
        }
    },
};

export default produtoController;