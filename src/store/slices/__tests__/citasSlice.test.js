import citasReducer, {
  setCitas,
  setLoading,
  setError,
  setFechaSeleccionada,
  selectCitas,
  selectCitasLoading,
  selectFechaSeleccionada,
} from "../citasSlice"

describe("citasSlice", () => {
  const initialState = {
    lista: [],
    loading: false,
    error: null,
    fechaSeleccionada: expect.any(String),
  }

  test("debe retornar el estado inicial", () => {
    const state = citasReducer(undefined, { type: "unknown" })
    expect(state.lista).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.fechaSeleccionada).toBeDefined()
  })

  test("debe manejar setCitas", () => {
    const citas = [
      { id: 1, fecha: "2024-01-15", hora: "09:00" },
    ]
    const actual = citasReducer(undefined, setCitas(citas))
    expect(actual.lista).toEqual(citas)
  })

  test("debe manejar setLoading", () => {
    const actual = citasReducer(undefined, setLoading(true))
    expect(actual.loading).toBe(true)
  })

  test("debe manejar setFechaSeleccionada", () => {
    const actual = citasReducer(undefined, setFechaSeleccionada("2024-12-25"))
    expect(actual.fechaSeleccionada).toBe("2024-12-25")
  })

  describe("selectores", () => {
    const state = {
      citas: {
        lista: [{ id: 1 }],
        loading: true,
        error: null,
        fechaSeleccionada: "2024-01-01",
      },
    }

    test("selectCitas retorna la lista", () => {
      expect(selectCitas(state)).toEqual([{ id: 1 }])
    })

    test("selectCitasLoading retorna loading", () => {
      expect(selectCitasLoading(state)).toBe(true)
    })

    test("selectFechaSeleccionada retorna la fecha", () => {
      expect(selectFechaSeleccionada(state)).toBe("2024-01-01")
    })
  })
})