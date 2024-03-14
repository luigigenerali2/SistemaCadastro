import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const urlBase = "http://localhost:4000/venda";

// Thunks
export const buscarVendas = createAsyncThunk("buscarVendas", async (parametro) => {
  try {
    const resposta = await fetch(urlBase, { method: "GET" });
    const dados = await resposta.json();
    console.log(dados)
    if (dados.status) {
      return {
        status: dados.status,
        mensagem: "",
        listaVendas: dados.listaVendas,
      };
    } else {
      return {
        status: dados.status,
        mensagem: dados.mensagem,
        listaVendas: [],
      };
    }
  } catch (erro) {
    return {
      status: false,
      mensagem: "Erro ao recuperar vendas:" + erro.message,
      listaVendas: [],
    };
  }
});

export const incluirVenda = createAsyncThunk("incluirVenda", async (venda) => {
  try {
    const resposta = await fetch(urlBase, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venda),
    });
    const dados = await resposta.json();
    if (dados.status) {
      venda.codigoVenda = dados.codigoGerado;
      return {
        status: dados.status,
        venda,
        mensagem: dados.mensagem,
      };
    } else {
      return {
        status: dados.status,
        mensagem: dados.mensagem,
      };
    }
  } catch (erro) {
    return {
      status: false,
      mensagem: "Não foi possível cadastrar a venda: " + erro.message,
    };
  }
});

export const atualizarVenda = createAsyncThunk("atualizarVenda", async (venda) => {
  try {
    const resposta = await fetch(urlBase, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venda),
    });
    const dados = await resposta.json();
    if (dados.status) {
      return {
        status: dados.status,
        venda,
        mensagem: dados.mensagem,
      };
    } else {
      return {
        status: dados.status,
        mensagem: dados.mensagem,
      };
    }
  } catch (erro) {
    return {
      status: false,
      mensagem: "Não foi possível atualizar a venda: " + erro.message,
    };
  }
});

export const excluirVenda = createAsyncThunk("excluirVenda", async (venda) => {
  try {
    const resposta = await fetch(urlBase, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codigoVenda: venda.codigoVenda }),
    });
    const dados = await resposta.json();
    if (dados.status) {
      return {
        status: dados.status,
        venda,
        mensagem: dados.mensagem,
      };
    } else {
      return {
        status: dados.status,
        mensagem: dados.mensagem,
      };
    }
  } catch (erro) {
    return {
      status: false,
      mensagem: "Não foi possível excluir a venda: " + erro.message,
    };
  }
});

const estadoInicial = {
  estado: ESTADO.OCIOSO,
  mensagem: "",
  vendas: [],
};

const vendaSlice = createSlice({
  name: 'venda',
  initialState: estadoInicial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buscarVendas.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
        state.mensagem = 'Buscando vendas...';
      })
      .addCase(buscarVendas.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.estado = ESTADO.OCIOSO;
          state.mensagem = action.payload.mensagem;
          state.vendas = action.payload.listaVendas;
        } else {
          state.estado = ESTADO.ERRO;
          state.mensagem = action.payload.mensagem;
        }
      })
      .addCase(buscarVendas.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload.mensagem;
      })
      .addCase(incluirVenda.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
        state.mensagem = 'Processando a requisição...';
      })
      .addCase(incluirVenda.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.estado = ESTADO.OCIOSO;
          state.mensagem = action.payload.mensagem;
          state.vendas.push(action.payload.venda);
        } else {
          state.estado = ESTADO.ERRO;
          state.mensagem = action.payload.mensagem;
        }
      })
      .addCase(incluirVenda.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload.mensagem;
      })
      .addCase(atualizarVenda.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
        state.mensagem = 'Processando a requisição...';
      })
      .addCase(atualizarVenda.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.estado = ESTADO.OCIOSO;
          state.mensagem = action.payload.mensagem;
          const indice = state.vendas.findIndex((venda) => venda.codigoVenda === action.payload.venda.codigoVenda);
          state.vendas[indice] = action.payload.venda;
        } else {
          state.estado = ESTADO.ERRO;
          state.mensagem = action.payload.mensagem;
        }
      })
      .addCase(atualizarVenda.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload.mensagem;
      })
      .addCase(excluirVenda.pending, (state) => {
        state.estado = ESTADO.PENDENTE;
        state.mensagem = 'Processando a requisição...';
      })
      .addCase(excluirVenda.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.estado = ESTADO.OCIOSO;
          state.mensagem = action.payload.mensagem;
          state.vendas = state.vendas.filter((venda) => venda.codigoVenda !== action.payload.venda.codigoVenda);
        } else {
          state.estado = ESTADO.ERRO;
          state.mensagem = action.payload.mensagem;
        }
      })
      .addCase(excluirVenda.rejected, (state, action) => {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload.mensagem;
      });
  },
});

export default vendaSlice.reducer;
