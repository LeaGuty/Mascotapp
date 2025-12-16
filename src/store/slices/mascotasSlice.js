import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  lista: [],
  loading: false,
  error: null,
}

const mascotasSlice = createSlice({
  name: "mascotas",
  initialState,
  reducers: {
    setMascotas: (state, action) => {
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

export const { setMascotas, setLoading, setError } = mascotasSlice.actions

export const selectMascotas = (state) => state.mascotas.lista
export const selectMascotasLoading = (state) => state.mascotas.loading

export default mascotasSlice.reducer