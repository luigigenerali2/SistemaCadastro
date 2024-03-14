import Fornecedor from "../modelo/fornecedor.js";
import conectar from "./conexao.js";

export default class FornecedorDAO {
    async gravar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "INSERT INTO fornecedor(for_cnpj, for_nome_fantasia, for_nome_social, for_ie, for_endereco, for_numero, for_cidade, for_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const parametros = [fornecedor.cnpj, fornecedor.nomeFantasia, fornecedor.nomeSocial, fornecedor.ie, fornecedor.endereco, fornecedor.numero, fornecedor.cidade, fornecedor.estado];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            fornecedor.cnpj = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "UPDATE fornecedor SET for_nome_fantasia = ?, for_nome_social = ?, for_ie = ?, for_endereco = ?, for_numero = ?, for_cidade = ?, for_estado = ? WHERE for_cnpj = ?";
            const parametros = [fornecedor.nomeFantasia, fornecedor.nomeSocial, fornecedor.ie, fornecedor.endereco, fornecedor.numero, fornecedor.cidade, fornecedor.estado, fornecedor.cnpj];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "DELETE FROM fornecedor WHERE for_cnpj = ?";
            const parametros = [fornecedor.cnpj];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta = "") {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            // Consultar pelo CNPJ do fornecedor
            sql = 'SELECT * FROM fornecedor WHERE for_cnpj = ? ORDER BY for_nome_fantasia';
            parametros = [parametroConsulta];
        } else {
            // Consultar todos os fornecedores
            sql = "SELECT * FROM fornecedor";
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const registro of registros) {
            const fornecedor = new Fornecedor(registro.for_cnpj, registro.for_nome_fantasia, registro.for_nome_social, registro.for_ie, registro.for_endereco, registro.for_numero, registro.for_cidade, registro.for_estado);
            listaFornecedores.push(fornecedor);
        }
        return listaFornecedores;
    }
}
