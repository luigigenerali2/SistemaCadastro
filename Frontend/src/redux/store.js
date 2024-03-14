import {configureStore} from '@reduxjs/toolkit';
import clienteSlice from './clienteReducer.js';
import categoriaSlice from './categoriaReducer.js';
import produtoSlice from './produtoReducer.js';
import vendaSlice from './vendaReducer.js';
import fornecedorSlice from './fornecedorReducer.js';

const store = configureStore({
    reducer:{
        cliente: clienteSlice,
        categoria: categoriaSlice,
        produto: produtoSlice,
        venda: vendaSlice,
        fornecedor: fornecedorSlice,
    }
});

export default store;