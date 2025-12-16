import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import App from "../App"
import { createTestStore } from "../test-utils"

describe("App", () => {
  test("renderiza sin errores", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(screen.getByText("🐾 MascotApp")).toBeInTheDocument()
  })

  test("renderiza la página de inicio por defecto", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(screen.getByText("Bienvenido a MascotApp")).toBeInTheDocument()
  })
})