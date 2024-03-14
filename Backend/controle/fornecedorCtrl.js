// camada de interface da API que traduz HTTP
import Fornecedor from "../modelo/fornecedor.js";

export default class FornecedorCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cnpj = dados.cnpj;
            const nomeFantasia = dados.nomeFantasia;
            const nomeSocial = dados.nomeSocial;
            const ie = dados.ie;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const cidade = dados.cidade;
            const estado = dados.estado;

            if (cnpj && nomeFantasia) {
                const fornecedor = new Fornecedor(cnpj, nomeFantasia, nomeSocial, ie, endereco, numero, cidade, estado);
                try {
                    await fornecedor.gravar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor incluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o fornecedor:" + erro.message
                    });
                }
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe CNPJ e nome fantasia do fornecedor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um fornecedor!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cnpj = dados.cnpj;
            const nomeFantasia = dados.nomeFantasia;
            const nomeSocial = dados.nomeSocial;
            const ie = dados.ie;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const cidade = dados.cidade;
            const estado = dados.estado;

            if (cnpj && nomeFantasia) {
                const fornecedor = new Fornecedor(cnpj, nomeFantasia, nomeSocial, ie, endereco, numero, cidade, estado);
                try {
                    await fornecedor.atualizar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor atualizado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o fornecedor:" + erro.message
                    });
                }
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe CNPJ e nome fantasia do fornecedor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um fornecedor!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cnpj = dados.cnpj;

            if (cnpj) {
                const fornecedor = new Fornecedor(cnpj);
                try {
                    await fornecedor.excluir();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor excluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o fornecedor:" + erro.message
                    });
                }
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o CNPJ do fornecedor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um fornecedor!"
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
            const fornecedor = new Fornecedor();
            try {
                const listaFornecedores = await fornecedor.consultar(termo);
                resposta.json({
                    status: true,
                    listaFornecedores
                });
            } catch (erro) {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter os fornecedores: " + erro.message
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar fornecedores!"
            });
        }
    }
}
