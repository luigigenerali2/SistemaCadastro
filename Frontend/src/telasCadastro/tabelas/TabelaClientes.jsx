import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarClientes, removerCliente } from "../../redux/clienteReducer"; // Importe as actions apropriadas
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function TabelaClientes(props) {
    const { estado, mensagem, clientes } = useSelector((state) => state.cliente);
    const dispatch = useDispatch();

    function excluirCliente(cliente) {
        if (window.confirm('Deseja realmente excluir esse cliente?')) {
            dispatch(removerCliente(cliente));
        }
    }

    function editarCliente(cliente) {
        // Implemente a função de edição conforme necessário
        props.setClienteParaEdicao(cliente);
        props.setModoEdicao(true);
        props.exibirFormulario(true);
    }

    useEffect(() => {
        dispatch(buscarClientes());
    }, [dispatch]);

    if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) => (
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Buscando clientes....</p>
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
                        // Implemente a função para exibir o formulário de novo cliente conforme necessário
                        props.exibirFormulario(true);
                    }}
                >
                    Novo Cliente
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Número</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>CEP</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => {
                            return(<tr key={cliente.cpf}>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.numero}</td>
                                <td>{cliente.bairro}</td>
                                <td>{cliente.cidade}</td>
                                <td>{cliente.uf}</td>
                                <td>{cliente.cep}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            excluirCliente(cliente);
                                        }}
                                    >
                                        Excluir
                                    </Button>{" "}
                                    <Button
                                        variant="warning"
                                        onClick={() => {
                                            editarCliente(cliente);
                                        }}
                                    >
                                        Editar
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
