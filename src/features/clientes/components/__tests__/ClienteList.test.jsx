import { render, screen } from "@testing-library/react"
import ClienteList from "../ClienteList"

describe("ClienteList", () => {
  test("renderiza el componente", () => {
    render(<ClienteList />)
    expect(screen.getByText("ClienteList")).toBeInTheDocument()
  })
})