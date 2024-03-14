import express from 'express';
import rotaCategoria from './rotas/rotaCategoria.js';
import rotaProduto from './rotas/rotaProduto.js';
import rotaCliente from './rotas/rotaCliente.js';
import rotaFornecedor from './rotas/rotaFornecedor.js';
import rotaVenda from './rotas/rotaVenda.js';
import cors from 'cors';

const host = "localhost";
const porta = 4000;
const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());

app.use('/categoria', rotaCategoria);
app.use('/produto', rotaProduto);
app.use('/cliente', rotaCliente);
app.use('/fornecedor', rotaFornecedor);
app.use('/venda', rotaVenda);

app.listen(porta, host, () => {
    console.log(`API do sistema em execução: ${host}:${porta}`);
});
