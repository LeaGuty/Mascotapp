import { Link, Outlet } from "react-router-dom"

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-blue-600">
              🐾 MascotApp
            </Link>
            <div className="flex gap-4">
              <Link to="/clientes" className="text-gray-600 hover:text-blue-600">
                Clientes
              </Link>
              <Link to="/mascotas" className="text-gray-600 hover:text-blue-600">
                Mascotas
              </Link>
              <Link to="/citas" className="text-gray-600 hover:text-blue-600">
                Citas
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido de la página */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout