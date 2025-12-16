import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  lista: [],
  loading: false,
  error: null,
}

const clientesSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    setClientes: (state, action) => {
      state.lista = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

// Actions - las usamos para modificar el estado
export const { setClientes, setLoading, setError } = clientesSlice.actions

// Selectors - las usamos para leer el estado
export const selectClientes = (state) => state.clientes.lista
export const selectClientesLoading = (state) => state.clientes.loading

export default clientesSlice.reducer