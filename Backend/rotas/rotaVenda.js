import { Router } from "express";
import VendaCtrl from "../controle/vendaCtrl.js";

const vendaCtrl = new VendaCtrl();
const rotaVenda = new Router();

rotaVenda
    .get('/', vendaCtrl.consultar)
    .get('/:parametro', vendaCtrl.consultar)
    .post('/', vendaCtrl.gravar)
    .patch('/', vendaCtrl.atualizar)
    .put('/', vendaCtrl.atualizar)
    .delete('/', vendaCtrl.excluir);

export default rotaVenda;
