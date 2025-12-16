import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Button from "../Button"

describe("Button", () => {
  test("renderiza el texto correctamente", () => {
    render(<Button>Guardar</Button>)
    expect(screen.getByText("Guardar")).toBeInTheDocument()
  })

  test("aplica la variante primary por defecto", () => {
    render(<Button>Click</Button>)
    const button = screen.getByText("Click")
    expect(button).toHaveClass("bg-blue-600")
  })

  test("aplica la variante secondary", () => {
    render(<Button variant="secondary">Click</Button>)
    const button = screen.getByText("Click")
    expect(button).toHaveClass("bg-gray-200")
  })

  test("aplica la variante danger", () => {
    render(<Button variant="danger">Eliminar</Button>)
    const button = screen.getByText("Eliminar")
    expect(button).toHaveClass("bg-red-500")
  })

  test("ejecuta onClick al hacer clic", async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    await userEvent.click(screen.getByText("Click"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test("aplica clases adicionales via className", () => {
    render(<Button className="mt-4">Click</Button>)
    const button = screen.getByText("Click")
    expect(button).toHaveClass("mt-4")
  })
})