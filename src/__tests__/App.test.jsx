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
    // CORRECCIÓN: El nombre de la app es VetCare Pro y no tiene emoji en el texto
    expect(screen.getByText("VetCare Pro")).toBeInTheDocument()
  })

  test("renderiza la página de inicio por defecto", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    // CORRECCIÓN: El título de bienvenida cambió
    expect(screen.getByText("Bienvenido a VetCare Pro")).toBeInTheDocument()
  })
})