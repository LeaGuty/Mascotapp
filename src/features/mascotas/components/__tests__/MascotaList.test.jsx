import { render, screen } from "@testing-library/react"
import MascotaList from "../MascotaList"

describe("MascotaList", () => {
  test("renderiza el componente", () => {
    render(<MascotaList />)
    expect(screen.getByText("MascotaList")).toBeInTheDocument()
  })
})