//camada de interface da API que traduz HTTP
import Cliente from "../modelo/cliente.js";

export default class ClienteCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;

            if (cpf && nome && endereco && numero && bairro && cidade && uf && cep) {
                const cliente = new Cliente(cpf, nome, endereco, numero, bairro, cidade, uf, cep);
                try {
                    await cliente.gravar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente incluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o cliente:" + erro.message
                    });
                }
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe CPF e nome do cliente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um cliente!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;

            if (cpf && nome && endereco && numero && bairro && cidade && uf && cep) {
                const cliente = new Cliente(cpf, nome, endereco, numero, bairro, cidade, uf, cep);
                try {
                    await cliente.atualizar();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente atualizado com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o cliente:" + erro.message
                    });
                }
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe CPF e nome do cliente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um cliente!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;

            if (cpf) {
                const cliente = new Cliente(cpf);
                try {
                    await cliente.excluir();
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente excluído com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o cliente:" + erro.message
                    });
                }
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o CPF do cliente!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um cliente!"
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const cliente = new Cliente();
            try {
                const listaClientes = await cliente.consultar(termo);
                resposta.json({
                    status: true,
                    listaClientes
                });
            } catch (erro) {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter os clientes: " + erro.message
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar clientes!"
            });
        }
    }
}
