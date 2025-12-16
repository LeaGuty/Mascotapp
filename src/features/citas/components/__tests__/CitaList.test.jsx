import { render, screen } from "@testing-library/react"
import CitaList from "../CitaList"

describe("CitaList", () => {
  test("renderiza el componente", () => {
    render(<CitaList />)
    expect(screen.getByText("CitaList")).toBeInTheDocument()
  })
})