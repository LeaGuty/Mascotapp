import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import MainLayout from "../MainLayout"

const renderWithRouter = (initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <MainLayout />
    </MemoryRouter>
  )
}

describe("MainLayout", () => {
  test("renderiza el logo MascotApp", () => {
    renderWithRouter()
    expect(screen.getByText("🐾 MascotApp")).toBeInTheDocument()
  })

  test("renderiza los links de navegación", () => {
    renderWithRouter()
    expect(screen.getByText("Clientes")).toBeInTheDocument()
    expect(screen.getByText("Mascotas")).toBeInTheDocument()
    expect(screen.getByText("Citas")).toBeInTheDocument()
  })

  test("el logo enlaza a la página principal", () => {
    renderWithRouter()
    const logoLink = screen.getByText("🐾 MascotApp").closest("a")
    expect(logoLink).toHaveAttribute("href", "/")
  })

  test("los links de navegación tienen las rutas correctas", () => {
    renderWithRouter()
    expect(screen.getByText("Clientes").closest("a")).toHaveAttribute("href", "/clientes")
    expect(screen.getByText("Mascotas").closest("a")).toHaveAttribute("href", "/mascotas")
    expect(screen.getByText("Citas").closest("a")).toHaveAttribute("href", "/citas")
  })
})