import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import HomePage from "../HomePage"

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe("HomePage", () => {
  test("renderiza el título de bienvenida", () => {
    renderWithRouter(<HomePage />)
    // Actualizado a VetCare Pro
    expect(screen.getByText("Bienvenido a VetCare Pro")).toBeInTheDocument()
  })

  test("renderiza la descripción", () => {
    renderWithRouter(<HomePage />)
    // Actualizado con el texto real de HomePage.jsx
    expect(
      screen.getByText("Sistema integral de gestión veterinaria para optimizar el cuidado de tus pacientes")
    ).toBeInTheDocument()
  })

  test("renderiza las 3 cards de navegación", () => {
    renderWithRouter(<HomePage />)
    // Se eliminaron los emojis porque son SVGs separados en el componente real
    expect(screen.getByText("Clientes")).toBeInTheDocument()
    expect(screen.getByText("Mascotas")).toBeInTheDocument()
    expect(screen.getByText("Citas")).toBeInTheDocument()
  })

  test("los links apuntan a las rutas correctas", () => {
    renderWithRouter(<HomePage />)
    
    // Se eliminaron los emojis para encontrar el texto
    const clientesLink = screen.getByText("Clientes").closest("a")
    const mascotasLink = screen.getByText("Mascotas").closest("a")
    const citasLink = screen.getByText("Citas").closest("a")

    expect(clientesLink).toHaveAttribute("href", "/clientes")
    expect(mascotasLink).toHaveAttribute("href", "/mascotas")
    expect(citasLink).toHaveAttribute("href", "/citas")
  })
})