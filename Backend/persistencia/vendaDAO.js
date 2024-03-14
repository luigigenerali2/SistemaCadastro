import Venda from "../modelo/venda.js";
import conectar from "./conexao.js";

export default class VendaDAO {
    async gravar(venda) {
        if (venda instanceof Venda) {
            const sql = "INSERT INTO venda(prod_codigo, cli_cpf, vend_dataVenda, vend_quantidade) VALUES(?, ?, ?, ?)";
            const parametros = [venda.codigoProduto, venda.codigoCliente, venda.dataVenda, venda.quantidade];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            venda.codigoVenda = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(venda) {
        if (venda instanceof Venda) {
            const sql = "UPDATE venda SET prod_codigo = ?, cli_cpf = ?, vend_dataVenda = ?, vend_quantidade = ? WHERE vend_codigo = ?";
            const parametros = [venda.codigoProduto, venda.codigoCliente, venda.dataVenda, venda.quantidade, venda.codigoVenda];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(venda) {
        if (venda instanceof Venda) {
            const sql = "DELETE FROM venda WHERE vend_codigo = ?";
            const parametros = [venda.codigoVenda];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];

        if (!parametroConsulta) {
            // Consultar todas as vendas
            sql = 'SELECT * FROM venda ORDER BY vend_dataVenda';
        } else if (!isNaN(parseInt(parametroConsulta))) {
            // Consultar pela chave primária (código da venda)
            sql = 'SELECT * FROM venda WHERE vend_codigo = ? ORDER BY vend_dataVenda';
            parametros = [parametroConsulta];
        } else {
            // Consultar pelo CPF do cliente ou código do produto
            sql = 'SELECT * FROM venda WHERE cli_cpf = ? OR prod_codigo = ? ORDER BY vend_dataVenda';
            parametros = [parametroConsulta, parametroConsulta];
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaVendas = [];
        for (const registro of registros) {
            const venda = new Venda(registro.vend_codigo, registro.prod_codigo, registro.cli_cpf, registro.vend_dataVenda, registro.vend_quantidade);
            listaVendas.push(venda);
        }
        return listaVendas;
    }
}
