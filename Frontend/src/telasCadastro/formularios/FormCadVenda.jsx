import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel, Spinner } from "react-bootstrap";
import { incluirVenda, atualizarVenda } from '../../redux/vendaReducer';
import { useSelector, useDispatch } from "react-redux";
import { buscarProdutos } from "../../redux/produtoReducer";
import { buscarClientes } from "../../redux/clienteReducer";
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";

export default function FormCadVenda(props) {
  const vendaVazia = {
    codigoVenda: '0',
    codigoProduto: '0',
    codigoCliente: '0',
    dataVenda: '',
    quantidade: '',
  };

  const [venda, setVenda] = useState(() => {
    return props.modoEdicao ? props.vendaParaEdicao : vendaVazia;
  });

  const [formValidado, setFormValidado] = useState(false);

  const { estado: estadoProd, mensagem: mensagemProd, produtos } = useSelector((state) => state.produto);
  const { estado: estadoClientes, mensagem: mensagemClientes, clientes } = useSelector((state) => state.cliente);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buscarClientes());
  }, [dispatch]);

  useEffect(() => {
      dispatch(buscarProdutos(venda.codigoProduto));
  }, [venda.codigoProduto, dispatch]);

  function manipularMudancas(e) {
    const componente = e.currentTarget;
    setVenda({ ...venda, [componente.name]: componente.value });
  }

  function manipularSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        dispatch(incluirVenda(venda));
      } else {
        dispatch(atualizarVenda(venda));
        props.setModoEdicao(false);
        props.setVendaParaEdicao(vendaVazia);
      }
      setVenda(vendaVazia);
      setFormValidado(false);
    } else {
      setFormValidado(true);
    }

    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <Container>
      <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel label="CPF do Cliente:">
                <Form.Select
                  aria-label="Selecione o CPF do cliente"
                  id="codigoCliente"
                  name="codigoCliente"
                  onChange={manipularMudancas}
                  value={venda.codigoCliente}
                  required
                >
                  <option value="0">Selecione um cliente</option>
                  {clientes?.map((cliente) => (
                    <option key={cliente.cpf} value={cliente.cpf}>
                      {cliente.cpf} - {cliente.nome}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">Selecione o cliente!</Form.Control.Feedback>
              {estadoClientes === ESTADO.PENDENTE ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Carregando produtos...</span>
                </Spinner>
              ) : null}
              {estadoClientes === ESTADO.ERRO ? (
                <p>Erro ao carregar os clientes: {mensagemClientes}</p>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel controlId="floatingSelectProduto" label="Produto:">
                <Form.Select
                  aria-label="Produto"
                  id='codigoProduto'
                  name='codigoProduto'
                  onChange={manipularMudancas}
                  value={venda.codigoProduto}
                  required
                >
                  <option value="0">Selecione um produto</option>
                  {produtos?.map((produto) => (
                    <option key={produto.codigo} value={produto.codigo}>
                      {produto.descricao}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              {estadoProd === ESTADO.PENDENTE ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Carregando produtos...</span>
                </Spinner>
              ) : null}
              {estadoProd === ESTADO.ERRO ? (
                <p>Erro ao carregar os produtos: {mensagemProd}</p>
              ) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel label="Quantidade:">
                <Form.Control
                  type="number"
                  placeholder="Informe a quantidade"
                  id="quantidade"
                  name="quantidade"
                  onChange={manipularMudancas}
                  value={venda.quantidade}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">Informe a quantidade!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel label="Data da Venda:">
                <Form.Control
                  type="date"
                  id="dataVenda"
                  name="dataVenda"
                  onChange={manipularMudancas}
                  value={venda.dataVenda}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">Informe a data da venda!</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <Button type="submit" variant={props.modoEdicao ? "warning" : "primary"}>
              {props.modoEdicao ? "Alterar" : "Cadastrar"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
