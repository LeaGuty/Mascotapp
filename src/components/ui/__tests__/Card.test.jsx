import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Card from "../Card"

describe("Card", () => {
  test("renderiza el contenido children", () => {
    render(<Card><p>Contenido de prueba</p></Card>)
    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument()
  })

  test("aplica estilos base correctamente", () => {
    render(<Card><p>Test</p></Card>)
    const card = screen.getByText("Test").parentElement
    expect(card).toHaveClass("bg-white", "rounded-xl", "shadow-md", "p-6")
  })

  test("aplica clases adicionales via className", () => {
    render(<Card className="bg-blue-50"><p>Test</p></Card>)
    const card = screen.getByText("Test").parentElement
    expect(card).toHaveClass("bg-blue-50")
  })

  test("ejecuta onClick cuando se hace clic", async () => {
    const handleClick = jest.fn()
    render(<Card onClick={handleClick}><p>Clickeable</p></Card>)
    
    await userEvent.click(screen.getByText("Clickeable").parentElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})