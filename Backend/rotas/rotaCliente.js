import { Router } from "express";
import ClienteCtrl from "../controle/clienteCtrl.js";

const cliCtrl = new ClienteCtrl();
const rotaCliente = new Router();

rotaCliente
    .get('/', cliCtrl.consultar)
    .get('/:parametro', cliCtrl.consultar)
    .post('/', cliCtrl.gravar)
    .patch('/', cliCtrl.atualizar)
    .put('/', cliCtrl.atualizar)
    .delete('/', cliCtrl.excluir);

export default rotaCliente;
