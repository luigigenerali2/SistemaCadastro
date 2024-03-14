//camada de interface da API que traduz HTTP
import Produto from "../modelo/produto.js";

export default class ProdutoCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const dataValidade = dados.dataValidade;
            const qtdEstoque = dados.qtdEstoque;
            const categoria = dados.categoria;

            if (descricao && precoCusto > 0 && precoVenda > 0 && dataValidade
                && qtdEstoque >= 0 && categoria) {
                const produto = new Produto(0, descricao, precoCusto,
                    precoVenda, dataValidade, qtdEstoque,
                    categoria);
                try {
                    await produto.gravar();
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": produto.codigo,
                        "mensagem": "Produto incluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o produto:" + erro.message
                    });
                }
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do produto segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um produto!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            const precoCusto = dados.precoCusto;
            const precoVenda = dados.precoVenda;
            const dataValidade = dados.dataValidade;
            const qtdEstoque = dados.qtdEstoque;
            const categoria = dados.categoria;
            if (codigo && descricao && precoCusto > 0 && precoVenda > 0 && dataValidade
                && qtdEstoque >= 0 && categoria) {
                const produto = new Produto(codigo, descricao, precoCusto,
                    precoVenda, dataValidade, qtdEstoque, categoria);
                try {
                    await produto.atualizar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Produto atualizado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o produto:" + erro.message
                    });
                }
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do produto segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um produto!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            console.log(dados);
            if (codigo) {
                const produto = new Produto(codigo);
                try {
                    await produto.excluir();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Produto excluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o produto:" + erro.message
                    });
                }
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do produto!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um produto!"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const produto = new Produto();
            try {
                const listaProdutos = await produto.consultar(termo);
                resposta.json({
                    status: true,
                    listaProdutos
                });
            } catch (erro) {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter os produtos: " + erro.message
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar produtos!"
            });
        }
    }
}
