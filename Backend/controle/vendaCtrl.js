// Camada de interface da API que traduz HTTP
import Venda from "../modelo/venda.js";

export default class VendaCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoProduto = dados.codigoProduto;
            const codigoCliente = dados.codigoCliente;
            const dataVenda = dados.dataVenda;
            const quantidade = dados.quantidade;

            if (codigoProduto && codigoCliente && dataVenda && quantidade) {
                const venda = new Venda(0, codigoProduto, codigoCliente, dataVenda, quantidade);
                try {
                    await venda.gravar();
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": venda.codigoVenda,
                        "mensagem": "Venda registrada com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a venda:" + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados necessários para a venda!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para registrar uma venda!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoVenda = dados.codigoVenda;
            const codigoProduto = dados.codigoProduto;
            const codigoCliente = dados.codigoCliente;
            const dataVenda = dados.dataVenda;
            const quantidade = dados.quantidade;

            if (codigoVenda && codigoProduto && codigoCliente && dataVenda && quantidade) {
                const venda = new Venda(codigoVenda, codigoProduto, codigoCliente, dataVenda, quantidade);
                try {
                    await venda.atualizar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Venda atualizada com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar a venda:" + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados necessários para atualizar a venda!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma venda!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigoVenda = dados.codigoVenda;

            if (codigoVenda) {
                const venda = new Venda(codigoVenda);
                try {
                    await venda.excluir();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Venda excluída com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir a venda:" + erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da venda a ser excluída!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma venda!"
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
            const venda = new Venda();
            try {
                const listaVendas = await venda.consultar(termo);
                resposta.json({
                    status: true,
                    listaVendas
                });
            } catch (erro) {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter as vendas: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar vendas!"
            });
        }
    }
}
