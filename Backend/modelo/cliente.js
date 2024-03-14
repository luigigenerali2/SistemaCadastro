import ClienteDAO from "../persistencia/clienteDAO.js";

export default class Cliente {
    #cpf;
    #nome;
    #endereco;
    #numero;
    #bairro;
    #cidade;
    #uf;
    #cep;

    constructor(cpf = 0, nome = '', endereco = '', numero = 0, bairro = '', cidade = '', uf = '', cep = 0) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
    }

    get cpf() {
        return this.#cpf;
    }

    get nome() {
        return this.#nome;
    }

    get endereco() {
        return this.#endereco;
    }

    get numero() {
        return this.#numero;
    }

    get bairro() {
        return this.#bairro;
    }

    get cidade() {
        return this.#cidade;
    }

    get uf() {
        return this.#uf;
    }

    get cep() {
        return this.#cep;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    set numero(novoNumero) {
        this.#numero = novoNumero;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    set uf(novoUf) {
        this.#uf = novoUf;
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }
    toJSON() {
        return {
            cpf: this.#cpf,
            nome: this.#nome,
            endereco: this.#endereco,
            numero: this.#numero,
            bairro: this.#bairro,
            cidade: this.#cidade,
            uf: this.#uf,
            cep: this.#cep
        };
    }

    async gravar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.gravar(this);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async atualizar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.atualizar(this);
    }

    async consultar(parametro) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(parametro);
    }
}