import { useState } from "react"
import { useClientes, useClienteDetalle } from "../hooks/useClientes"
import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"

function ClientesPage() {
  const { clientes, loading } = useClientes()
  const [selectedId, setSelectedId] = useState(null)
  const { cliente: clienteDetalle, loading: loadingDetalle } = useClienteDetalle(selectedId)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando clientes...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Clientes</h1>
      <p className="text-gray-500 mb-6">
        📋 Listado via <span className="font-mono bg-blue-100 px-1 rounded">REST API</span>
        {" | "}
        🔍 Detalle via <span className="font-mono bg-purple-100 px-1 rounded">GraphQL</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listado de clientes */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Listado (REST)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clientes.map((cliente) => (
              <Card
                key={cliente.id}
                className={`cursor-pointer transition-all ${
                  selectedId === cliente.id
                    ? "ring-2 ring-blue-500"
                    : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedId(cliente.id)}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {cliente.nombre}
                </h3>
                <p className="text-sm text-gray-600">📞 {cliente.telefono}</p>
                <Button
                  variant="secondary"
                  className="mt-3 text-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedId(cliente.id)
                  }}
                >
                  Ver detalle
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Panel de detalle */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Detalle (GraphQL)
          </h2>
          {!selectedId ? (
            <Card className="bg-gray-50">
              <p className="text-gray-500 text-center">
                Selecciona un cliente para ver su detalle
              </p>
            </Card>
          ) : loadingDetalle ? (
            <Card>
              <p className="text-gray-500">Cargando detalle...</p>
            </Card>
          ) : clienteDetalle ? (
            <Card className="bg-blue-50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {clienteDetalle.nombre}
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">📞 Teléfono:</span> {clienteDetalle.telefono}</p>
                <p><span className="font-medium">📧 Email:</span> {clienteDetalle.email}</p>
                <p><span className="font-medium">📍 Dirección:</span> {clienteDetalle.direccion}</p>
              </div>

              {clienteDetalle.mascotas && clienteDetalle.mascotas.length > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <h4 className="font-semibold text-gray-700 mb-2">🐾 Mascotas:</h4>
                  <ul className="space-y-1">
                    {clienteDetalle.mascotas.map((mascota) => (
                      <li key={mascota.id} className="text-sm text-gray-600">
                        • {mascota.nombre} ({mascota.especie} - {mascota.raza})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ) : (
            <Card className="bg-red-50">
              <p className="text-red-500">Cliente no encontrado</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClientesPage