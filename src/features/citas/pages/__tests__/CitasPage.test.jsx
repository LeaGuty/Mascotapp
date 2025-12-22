import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../../../../test-utils"
import CitasPage from "../CitasPage"

// Mock del fetch global
global.fetch = jest.fn()

describe("CitasPage", () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("muestra el título de la página", () => {
    fetch.mockImplementation(() => new Promise(() => {})) // Promesa pendiente para estado de carga
    renderWithProviders(<CitasPage />)
    // CORRECCIÓN: El título real en el componente es "Gestión de Citas"
    expect(screen.getByText("Gestión de Citas")).toBeInTheDocument()
  })

  test("muestra el label del selector de fecha", () => {
    fetch.mockImplementation(() => new Promise(() => {}))
    renderWithProviders(<CitasPage />)
    expect(screen.getByText("Filtrar por fecha:")).toBeInTheDocument()
  })

  test("muestra las citas después de cargar", async () => {
    const mockCitas = [
      {
        id: 1,
        fecha: "2024-01-15",
        hora: "09:00",
        estado: "Confirmada",
        mascota: { id: 1, nombre: "Max" },
        cliente: { id: 1, nombre: "Juan" },
        veterinario: { id: 1, nombre: "Dra. Soto" },
      },
    ]

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockCitas),
    })

    renderWithProviders(<CitasPage />)

    // Esperamos a que el mock se resuelva y aparezca la hora
    await waitFor(() => {
      expect(screen.getByText("09:00")).toBeInTheDocument()
    })
    // Verificamos también que aparezca el nombre de la mascota
    expect(screen.getByText("Max")).toBeInTheDocument()
  })

  test("muestra mensaje cuando no hay citas", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    })

    renderWithProviders(<CitasPage />)

    await waitFor(() => {
      // El texto coincide con el renderizado condicional de tu componente
      expect(screen.getByText("No hay citas programadas para esta fecha")).toBeInTheDocument()
    })
  })
})