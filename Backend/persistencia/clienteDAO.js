import Cliente from "../modelo/cliente.js";
import conectar from "./conexao.js";

export default class ClienteDAO {
    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "INSERT INTO cliente(cli_cpf, cli_nome, cli_endereco, cli_numero, cli_bairro, cli_cidade, cli_uf, cli_cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const parametros = [cliente.cpf, cliente.nome, cliente.endereco, cliente.numero, cliente.bairro, cliente.cidade, cliente.uf, cliente.cep];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            cliente.cpf = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "UPDATE cliente SET cli_nome = ?, cli_endereco = ?, cli_numero = ?, cli_bairro = ?, cli_cidade = ?, cli_uf = ?, cli_cep = ? WHERE cli_cpf = ?";
            const parametros = [cliente.nome, cliente.endereco, cliente.numero, cliente.bairro, cliente.cidade, cliente.uf, cliente.cep, cliente.cpf];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "DELETE FROM cliente WHERE cli_cpf = ?";
            const parametros = [cliente.cpf];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta = "") {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            // Consultar pelo CPF do cliente
            sql = 'SELECT * FROM cliente WHERE cli_cpf = ? ORDER BY cli_nome';
            parametros = [parametroConsulta];
        } else {
            // Consultar pelo nome do cliente
            sql = "SELECT * FROM cliente";
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const registro of registros) {
            const cliente = new Cliente(registro.cli_cpf, registro.cli_nome, registro.cli_endereco, registro.cli_numero, registro.cli_bairro, registro.cli_cidade, registro.cli_uf, registro.cli_cep);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}
