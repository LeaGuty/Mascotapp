import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../../../../test-utils"
import ClientesPage from "../ClientesPage"

// Mock del fetch
global.fetch = jest.fn()

describe("ClientesPage", () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("muestra estado de carga inicialmente", () => {
    fetch.mockImplementation(() => new Promise(() => {}))
    renderWithProviders(<ClientesPage />)
    expect(screen.getByText("Cargando clientes...")).toBeInTheDocument()
  })

  test("muestra los clientes después de cargar", async () => {
    const mockClientes = [
      { id: 1, nombre: "Juan Pérez", telefono: "123456789", email: "juan@test.com" },
      { id: 2, nombre: "María García", telefono: "987654321", email: "maria@test.com" },
    ]

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockClientes),
    })

    renderWithProviders(<ClientesPage />)

    await waitFor(() => {
      expect(screen.getByText("Juan Pérez")).toBeInTheDocument()
    })
    expect(screen.getByText("María García")).toBeInTheDocument()
  })

  test("muestra el título después de cargar datos", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([{ id: 1, nombre: "Test", telefono: "123", email: "t@t.com" }]),
    })

    renderWithProviders(<ClientesPage />)

    await waitFor(() => {
      expect(screen.getByText("Clientes")).toBeInTheDocument()
    })
  })

  test("muestra mensaje para seleccionar cliente", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([{ id: 1, nombre: "Test", telefono: "123", email: "t@t.com" }]),
    })

    renderWithProviders(<ClientesPage />)

    await waitFor(() => {
      expect(screen.getByText("Selecciona un cliente para ver su detalle")).toBeInTheDocument()
    })
  })
})