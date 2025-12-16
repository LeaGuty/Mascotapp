import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  lista: [],
  loading: false,
  error: null,
  fechaSeleccionada: new Date().toISOString().split("T")[0], // fecha de hoy
}

const citasSlice = createSlice({
  name: "citas",
  initialState,
  reducers: {
    setCitas: (state, action) => {
      state.lista = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setFechaSeleccionada: (state, action) => {
      state.fechaSeleccionada = action.payload
    },
  },
})

export const { setCitas, setLoading, setError, setFechaSeleccionada } = citasSlice.actions

export const selectCitas = (state) => state.citas.lista
export const selectCitasLoading = (state) => state.citas.loading
export const selectFechaSeleccionada = (state) => state.citas.fechaSeleccionada

export default citasSlice.reducer