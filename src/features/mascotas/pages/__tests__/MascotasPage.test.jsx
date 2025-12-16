import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../../../../test-utils"
import MascotasPage from "../MascotasPage"

global.fetch = jest.fn()

describe("MascotasPage", () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("muestra estado de carga inicialmente", () => {
    fetch.mockImplementation(() => new Promise(() => {}))
    renderWithProviders(<MascotasPage />)
    expect(screen.getByText("Cargando mascotas...")).toBeInTheDocument()
  })

  test("muestra las mascotas después de cargar", async () => {
    const mockMascotas = [
      { id: 1, nombre: "Max", especie: "Perro", raza: "Labrador", cliente: { id: 1, nombre: "Juan" } },
    ]

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockMascotas),
    })

    renderWithProviders(<MascotasPage />)

    await waitFor(() => {
      expect(screen.getByText(/Max/)).toBeInTheDocument()
    })
  })

  test("muestra el título después de cargar", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([{ id: 1, nombre: "Luna", especie: "Gato", raza: "Siamés", cliente: { nombre: "Ana" } }]),
    })

    renderWithProviders(<MascotasPage />)

    await waitFor(() => {
      expect(screen.getByText("Mascotas")).toBeInTheDocument()
    })
  })

  test("muestra mensaje para seleccionar mascota", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([{ id: 1, nombre: "Max", especie: "Perro", raza: "Lab", cliente: { nombre: "Juan" } }]),
    })

    renderWithProviders(<MascotasPage />)

    await waitFor(() => {
      expect(screen.getByText("Selecciona una mascota para ver su detalle")).toBeInTheDocument()
    })
  })
})