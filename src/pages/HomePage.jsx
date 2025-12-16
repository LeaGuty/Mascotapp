import { Link } from "react-router-dom"
import Card from "../components/ui/Card"

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bienvenido a MascotApp
      </h1>
      <p className="text-gray-600 mb-8">
        Sistema de gestión para la veterinaria "Cuidado Animal"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/clientes">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">👥 Clientes</h2>
            <p className="text-gray-600">Gestiona la información de los dueños</p>
          </Card>
        </Link>
        <Link to="/mascotas">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">🐕 Mascotas</h2>
            <p className="text-gray-600">Registro de pacientes y su historial</p>
          </Card>
        </Link>
        <Link to="/citas">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">📅 Citas</h2>
            <p className="text-gray-600">Agenda de atenciones del día</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default HomePage