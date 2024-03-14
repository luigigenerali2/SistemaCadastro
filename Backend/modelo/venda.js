import VendaDAO from "../persistencia/vendaDAO.js";

export default class Venda {
    #codigoVenda;
    #codigoProduto;
    #codigoCliente;  // Novo parâmetro
    #dataVenda;
    #quantidade;

    constructor(codigoVenda = 0, codigoProduto = 0, codigoCliente = 0, dataVenda = '', quantidade = 0) {
        this.#codigoVenda = codigoVenda;
        this.#codigoProduto = codigoProduto;
        this.#codigoCliente = codigoCliente;  // Inclusão do novo parâmetro
        this.#dataVenda = dataVenda;
        this.#quantidade = quantidade;
    }

    get codigoVenda() {
        return this.#codigoVenda;
    }

    set codigoVenda(novoCodigoVenda) {
        this.#codigoVenda = novoCodigoVenda;
    }

    get codigoProduto() {
        return this.#codigoProduto;
    }

    set codigoProduto(novoCodigoProduto) {
        this.#codigoProduto = novoCodigoProduto;
    }

    get codigoCliente() {
        return this.#codigoCliente;
    }

    set codigoCliente(novoCodigoCliente) {
        this.#codigoCliente = novoCodigoCliente;
    }

    get dataVenda() {
        return this.#dataVenda;
    }

    set dataVenda(novaDataVenda) {
        this.#dataVenda = novaDataVenda;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }

    toJSON() {
        return {
            codigoVenda: this.#codigoVenda,
            codigoProduto: this.#codigoProduto,
            codigoCliente: this.#codigoCliente,
            dataVenda: this.#dataVenda,
            quantidade: this.#quantidade
        };
    }

    async gravar() {
        const vendaDAO = new VendaDAO();
        await vendaDAO.gravar(this);
    }

    async excluir() {
        const vendaDAO = new VendaDAO();
        await vendaDAO.excluir(this);
    }

    async atualizar() {
        const vendaDAO = new VendaDAO();
        await vendaDAO.atualizar(this);
    }

    async consultar(parametro) {
        const vendaDAO = new VendaDAO();
        return await vendaDAO.consultar(parametro);
    }
}
