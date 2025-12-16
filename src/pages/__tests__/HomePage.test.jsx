import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import HomePage from "../HomePage"

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe("HomePage", () => {
  test("renderiza el título de bienvenida", () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByText("Bienvenido a MascotApp")).toBeInTheDocument()
  })

  test("renderiza la descripción", () => {
    renderWithRouter(<HomePage />)
    expect(
      screen.getByText('Sistema de gestión para la veterinaria "Cuidado Animal"')
    ).toBeInTheDocument()
  })

  test("renderiza las 3 cards de navegación", () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByText("👥 Clientes")).toBeInTheDocument()
    expect(screen.getByText("🐕 Mascotas")).toBeInTheDocument()
    expect(screen.getByText("📅 Citas")).toBeInTheDocument()
  })

  test("los links apuntan a las rutas correctas", () => {
    renderWithRouter(<HomePage />)
    
    const clientesLink = screen.getByText("👥 Clientes").closest("a")
    const mascotasLink = screen.getByText("🐕 Mascotas").closest("a")
    const citasLink = screen.getByText("📅 Citas").closest("a")

    expect(clientesLink).toHaveAttribute("href", "/clientes")
    expect(mascotasLink).toHaveAttribute("href", "/mascotas")
    expect(citasLink).toHaveAttribute("href", "/citas")
  })
})