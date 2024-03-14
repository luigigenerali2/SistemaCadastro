CREATE DATABASE sistema;

USE sistema;

CREATE TABLE categoria(
    cat_codigo INT NOT NULL AUTO_INCREMENT,
    cat_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
);

CREATE TABLE produto(
    prod_codigo INT NOT NULL AUTO_INCREMENT,
    prod_descricao VARCHAR(100) NOT NULL,
    prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_dataValidade DATE,
    prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    cat_codigo INT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY(prod_codigo),
    CONSTRAINT fk_categoria FOREIGN KEY(cat_codigo) REFERENCES categoria(cat_codigo)
);

CREATE TABLE cliente (
    cli_cpf INT PRIMARY KEY,
    cli_nome VARCHAR(255),
    cli_endereco VARCHAR(255),
    cli_numero INT,
    cli_bairro VARCHAR(255),
    cli_cidade VARCHAR(255),
    cli_uf VARCHAR(2),
    cli_cep INT
);

CREATE TABLE fornecedor (
    for_cnpj BIGINT PRIMARY KEY,
    for_nome_fantasia VARCHAR(255),
    for_nome_social VARCHAR(255),
    for_ie VARCHAR(20),
    for_endereco VARCHAR(255),
    for_numero INT,
    for_cidade VARCHAR(255),
    for_estado VARCHAR(2)
);

CREATE TABLE venda (
    vend_codigo INT NOT NULL AUTO_INCREMENT,
    prod_codigo INT NOT NULL,
    cli_cpf INT NOT NULL,
    vend_dataVenda DATE,
    vend_quantidade DECIMAL(10,2) NOT NULL DEFAULT 0,
    CONSTRAINT pk_venda PRIMARY KEY(vend_codigo),
    CONSTRAINT fk_produto_venda FOREIGN KEY(prod_codigo) REFERENCES produto(prod_codigo),
    CONSTRAINT fk_cliente_venda FOREIGN KEY(cli_cpf) REFERENCES cliente(cli_cpf)
);
