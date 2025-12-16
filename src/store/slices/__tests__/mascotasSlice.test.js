import mascotasReducer, {
  setMascotas,
  setLoading,
  setError,
  selectMascotas,
  selectMascotasLoading,
} from "../mascotasSlice"

describe("mascotasSlice", () => {
  const initialState = {
    lista: [],
    loading: false,
    error: null,
  }

  test("debe retornar el estado inicial", () => {
    expect(mascotasReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  test("debe manejar setMascotas", () => {
    const mascotas = [
      { id: 1, nombre: "Max", especie: "Perro" },
      { id: 2, nombre: "Luna", especie: "Gato" },
    ]
    const actual = mascotasReducer(initialState, setMascotas(mascotas))
    expect(actual.lista).toEqual(mascotas)
  })

  test("debe manejar setLoading", () => {
    const actual = mascotasReducer(initialState, setLoading(true))
    expect(actual.loading).toBe(true)
  })

  test("debe manejar setError", () => {
    const actual = mascotasReducer(initialState, setError("Error"))
    expect(actual.error).toBe("Error")
  })

  describe("selectores", () => {
    const state = {
      mascotas: {
        lista: [{ id: 1, nombre: "Max" }],
        loading: false,
        error: null,
      },
    }

    test("selectMascotas retorna la lista", () => {
      expect(selectMascotas(state)).toEqual([{ id: 1, nombre: "Max" }])
    })

    test("selectMascotasLoading retorna el estado de loading", () => {
      expect(selectMascotasLoading(state)).toBe(false)
    })
  })
})