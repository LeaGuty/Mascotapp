import { configureStore } from "@reduxjs/toolkit"
import clientesReducer from "./slices/clientesSlice"
import mascotasReducer from "./slices/mascotasSlice"
import citasReducer from "./slices/citasSlice"

export const store = configureStore({
  reducer: {
    clientes: clientesReducer,
    mascotas: mascotasReducer,
    citas: citasReducer,
  },
})