import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../../../../test-utils"
import MascotasPage from "../MascotasPage"

// Mock del fetch global
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
    // Este texto es correcto según tu componente
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
      // Usamos una expresión regular o string exacto, ambos funcionan bien aquí
      expect(screen.getByText("Max")).toBeInTheDocument()
    })
    // Verificación adicional recomendada
    expect(screen.getByText("Perro • Labrador")).toBeInTheDocument()
  })

  test("muestra el título después de cargar", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([{ id: 1, nombre: "Luna", especie: "Gato", raza: "Siamés", cliente: { nombre: "Ana" } }]),
    })

    renderWithProviders(<MascotasPage />)

    await waitFor(() => {
      // CORRECCIÓN: El título real es "Gestión de Mascotas"
      expect(screen.getByText("Gestión de Mascotas")).toBeInTheDocument()
    })
  })

  test("muestra mensaje para seleccionar mascota", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([{ id: 1, nombre: "Max", especie: "Perro", raza: "Lab", cliente: { nombre: "Juan" } }]),
    })

    renderWithProviders(<MascotasPage />)

    await waitFor(() => {
      // CORRECCIÓN: El texto real es más largo en tu componente actual
      expect(screen.getByText("Selecciona una mascota para ver su información completa")).toBeInTheDocument()
    })
  })
})