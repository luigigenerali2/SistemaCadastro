import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadFornecedor from "./formularios/FormCadFornecedor";
import TabelaFornecedores from "./tabelas/TabelaFornecedores";
import { useState } from "react";

export default function TelaCadastroFornecedor(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [fornecedorParaEdicao, setFornecedorParaEdicao] = useState({
        cnpj: '',
        nomeFantasia: '',
        nomeSocial: '',
        ie: '',
        endereco: '',
        numero: '',
        cidade: '',
        estado: ''
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    exibirFormulario ? <FormCadFornecedor exibirFormulario={setExibirFormulario}
                        fornecedorParaEdicao={fornecedorParaEdicao}
                        setFornecedorParaEdicao={setFornecedorParaEdicao}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                    />
                        :
                        <TabelaFornecedores exibirFormulario={setExibirFormulario}
                            fornecedorParaEdicao={fornecedorParaEdicao}
                            setFornecedorParaEdicao={setFornecedorParaEdicao}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                        />
                }
            </Pagina>
        </Container>
    )
}