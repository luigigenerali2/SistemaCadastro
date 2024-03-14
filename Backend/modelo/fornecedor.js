import FornecedorDAO from "../persistencia/fornecedorDAO.js";

export default class Fornecedor {
    #cnpj;
    #nomeFantasia;
    #nomeSocial;
    #ie;
    #endereco;
    #numero;
    #cidade;
    #estado;

    constructor(cnpj = 0, nomeFantasia = '', nomeSocial = '', ie = '', endereco = '', numero = 0, cidade = '', estado = '') {
        this.#cnpj = cnpj;
        this.#nomeFantasia = nomeFantasia;
        this.#nomeSocial = nomeSocial;
        this.#ie = ie;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#cidade = cidade;
        this.#estado = estado;
    }

    // Métodos Getter e Setter para os atributos

    get cnpj() {
        return this.#cnpj;
    }

    get nomeFantasia() {
        return this.#nomeFantasia;
    }

    get nomeSocial() {
        return this.#nomeSocial;
    }

    get ie() {
        return this.#ie;
    }

    get endereco() {
        return this.#endereco;
    }

    get numero() {
        return this.#numero;
    }

    get cidade() {
        return this.#cidade;
    }

    get estado() {
        return this.#estado;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }

    set nomeFantasia(novoNomeFantasia) {
        this.#nomeFantasia = novoNomeFantasia;
    }

    set nomeSocial(novoNomeSocial) {
        this.#nomeSocial = novoNomeSocial;
    }

    set ie(novoIe) {
        this.#ie = novoIe;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    set estado(novoEstado) {
        this.#estado = novoEstado;
    }

    // Método toJSON para serialização
    toJSON() {
        return {
            cnpj: this.#cnpj,
            nomeFantasia: this.#nomeFantasia,
            nomeSocial: this.#nomeSocial,
            ie: this.#ie,
            endereco: this.#endereco,
            numero: this.#numero,
            cidade: this.#cidade,
            estado: this.#estado
        };
    }

    // Métodos para interação com a camada de persistência usando FornecedorDAO

    async gravar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.gravar(this);
    }

    async excluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }

    async atualizar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.atualizar(this);
    }

    async consultar(parametro) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(parametro);
    }
}
