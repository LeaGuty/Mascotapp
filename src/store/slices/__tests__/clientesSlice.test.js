import clientesReducer, {
  setClientes,
  setLoading,
  setError,
  selectClientes,
  selectClientesLoading,
} from "../clientesSlice"

describe("clientesSlice", () => {
  const initialState = {
    lista: [],
    loading: false,
    error: null,
  }

  test("debe retornar el estado inicial", () => {
    expect(clientesReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  test("debe manejar setClientes", () => {
    const clientes = [
      { id: 1, nombre: "Juan" },
      { id: 2, nombre: "María" },
    ]
    const actual = clientesReducer(initialState, setClientes(clientes))
    expect(actual.lista).toEqual(clientes)
  })

  test("debe manejar setLoading", () => {
    const actual = clientesReducer(initialState, setLoading(true))
    expect(actual.loading).toBe(true)
  })

  test("debe manejar setError", () => {
    const actual = clientesReducer(initialState, setError("Error de red"))
    expect(actual.error).toBe("Error de red")
  })

  describe("selectores", () => {
    const state = {
      clientes: {
        lista: [{ id: 1, nombre: "Test" }],
        loading: true,
        error: null,
      },
    }

    test("selectClientes retorna la lista", () => {
      expect(selectClientes(state)).toEqual([{ id: 1, nombre: "Test" }])
    })

    test("selectClientesLoading retorna el estado de loading", () => {
      expect(selectClientesLoading(state)).toBe(true)
    })
  })
})