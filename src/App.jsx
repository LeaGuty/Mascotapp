import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import ClientesPage from "./features/clientes/pages/ClientesPage"
import MascotasPage from "./features/mascotas/pages/MascotasPage"
import CitasPage from "./features/citas/pages/CitasPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="mascotas" element={<MascotasPage />} />
          <Route path="citas" element={<CitasPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App