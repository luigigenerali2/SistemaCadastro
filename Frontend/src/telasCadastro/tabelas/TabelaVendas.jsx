import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarVendas, excluirVenda } from "../../redux/vendaReducer";
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { buscarClientes } from "../../redux/clienteReducer";
import { buscarProdutos } from "../../redux/produtoReducer";

export default function TabelaVendas(props) {
  const { estado, mensagem, vendas } = useSelector((state) => state.venda);
  const { clientes } = useSelector((state) => state.cliente);
  const { produtos } = useSelector((state) => state.produto);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buscarVendas());
    dispatch(buscarClientes());
    dispatch(buscarProdutos());
  }, [dispatch]);

  function removerVenda(venda) {
    if (window.confirm('Deseja realmente excluir essa venda?')) {
      dispatch(excluirVenda(venda));
    }
  }

  function editarVenda(venda) {
    props.setVendaParaEdicao(venda);
    props.setModoEdicao(true);
    props.exibirFormulario(true);
  }

  if (estado === ESTADO.PENDENTE) {
    toast(({ closeToast }) => (
      <div>
        <Spinner animation="border" role="status"></Spinner>
        <p>Buscando vendas....</p>
      </div>
    ), { toastId: estado });
  } else if (estado === ESTADO.ERRO) {
    toast.error(({ closeToast }) => (
      <div>
        <p>{mensagem}</p>
      </div>
    ), { toastId: estado });
  } else {
    toast.dismiss();
    return (
      <Container>
        <Button
          type="button"
          onClick={() => {
            props.exibirFormulario(true);
          }}
        >
          Nova Venda
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Código Venda</th>
              <th>Produto</th>
              <th>Cliente</th>
              <th>Data da Venda</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => {
              const produto = produtos.find((prod) => prod.codigo === venda.codigoProduto);
              const cliente = clientes.find((cli) => cli.cpf === venda.codigoCliente);
              return (
                <tr key={venda.codigoVenda}>
                  <td>{venda.codigoVenda}</td>
                  <td>{produto?.descricao}</td>
                  <td>{cliente?.nome}</td>
                  <td>{venda.dataVenda}</td>
                  <td>{venda.quantidade}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        removerVenda(venda);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                    </Button>{" "}
                    <Button
                      variant="warning"
                      onClick={() => {
                        editarVenda(venda);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil-square"
                                            viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}
