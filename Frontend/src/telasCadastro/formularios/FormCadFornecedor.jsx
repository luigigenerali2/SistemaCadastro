import { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Form, Row, Col, Button, FloatingLabel, Spinner } from 'react-bootstrap';
import { adicionarFornecedor, atualizarFornecedor } from '../../redux/fornecedorReducer';
import { useSelector, useDispatch } from 'react-redux';
import ESTADO from '../../recursos/estado';

export default function FormCadFornecedor(props) {

    const fornecedorVazia = {
        cnpj: '',
        nomeFantasia: '',
        nomeSocial: '',
        ie: '',
        endereco: '',
        numero: '',
        cidade: '',
        estado: '',

    }
    const estadoInicialFornecedor = props.fornecedorParaEdicao;
    const [fornecedor, setFornecedor] = useState(estadoInicialFornecedor);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, fornecedores } = useSelector((state) => state.fornecedor);
    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setFornecedor({ ...fornecedor, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(adicionarFornecedor(fornecedor));
            }
            else {
                dispatch(atualizarFornecedor(fornecedor));
                props.setModoEdicao(false);
                props.setFornecedorParaEdicao(fornecedorVazia);
            }
            setFornecedor(fornecedorVazia); // ou sair da tela de formulário 
            setFormValidado(false);
        }
        else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    if (estado === ESTADO.ERRO) {
        toast.error(({ closeToast }) =>
            <div>
                <p>{mensagem}</p>

            </div>
            , { toastId: estado });
    }
    else if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) =>
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Processando a requisição...</p>
            </div>
            , { toastId: estado });
    }
    else {
        toast.dismiss();
        return (
            
            <Container>
                <h2>Cadastro de Fornecedores</h2>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="CNPJ:"
                                    className="mb-3"
                                >

                                    <Form.Control
                                        type="text"
                                        placeholder="0"
                                        id="cnpj"
                                        name="cnpj"
                                        value={fornecedor.cnpj}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o cnpj do fornecedor!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Nome Ficticio:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o nome fantasia"
                                        id="nomeFantasia"
                                        name="nomeFantasia"
                                        value={fornecedor.nomeFantasia}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o nome fantasia do fornecedor!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Nome Social:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o nome social"
                                        id="nomeSocial"
                                        name="nomeSocial"
                                        value={fornecedor.nomeSocial}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o nome social do fornecedor!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="IE:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o IE"
                                        id="ie"
                                        name="ie"
                                        value={fornecedor.ie}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o IE fornecedor!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Endereço:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o endereço"
                                        id="endereco"
                                        name="endereco"
                                        value={fornecedor.endereco}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o endereço do fornecedor!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Numero:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o numero"
                                        id="numero"
                                        name="numero"
                                        value={fornecedor.numero}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o numero do fornecedor!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Cidade:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe a cidade"
                                        id="cidade"
                                        name="cidade"
                                        value={fornecedor.cidade}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe a cidade do fornecedor!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Estado:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o estado"
                                        id="estado"
                                        name="estado"
                                        value={fornecedor.estado}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o estado do fornecedor!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} offset={5} className="d-flex justify-content-end">
                            <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                        </Col>
                        <Col md={6} offset={5}>
                            <Button type="button" variant={"secondary"} onClick={() => {
                                props.exibirFormulario(false)
                            }
                            }>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}