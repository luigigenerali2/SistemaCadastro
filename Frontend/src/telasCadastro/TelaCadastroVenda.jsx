import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadVenda from "./formularios/FormCadVenda";
import TabelaVendas from "./tabelas/TabelaVendas";
import { useState } from "react";

export default function TelaCadastroVenda(props) {
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [vendaParaEdicao, setVendaParaEdicao] = useState({
    codigoVenda: '0',
    codigoProduto: '',
    codigoCliente: '',
    dataVenda: '',
    quantidade: '',
  });

  return (
    <Container>
      <Pagina>
        {exibirFormulario ? (
          <FormCadVenda
            exibirFormulario={setExibirFormulario}
            setExibirFormulario={setExibirFormulario}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            vendaParaEdicao={vendaParaEdicao}
            setVendaParaEdicao={setVendaParaEdicao}
          />
        ) : (
          <TabelaVendas
            exibirFormulario={setExibirFormulario}
            setExibirFormulario={setExibirFormulario}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            setVendaParaEdicao={setVendaParaEdicao}
          />
        )}
      </Pagina>
    </Container>
  );
}
