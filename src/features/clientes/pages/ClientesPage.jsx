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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Clientes</h1>
        <p className="text-gray-600">
          Listado via <span className="font-mono bg-teal-100 text-teal-700 px-2 py-0.5 rounded">REST API</span>
          {" • "}
          Detalle via <span className="font-mono bg-purple-100 text-purple-700 px-2 py-0.5 rounded">GraphQL</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listado de clientes */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800">
              Listado de Clientes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clientes.map((cliente) => (
              <Card
                key={cliente.id}
                className={`cursor-pointer transition-all border ${
                  selectedId === cliente.id
                    ? "ring-2 ring-teal-500 border-teal-300 shadow-lg"
                    : "border-gray-100 hover:shadow-xl hover:border-teal-200"
                }`}
                onClick={() => setSelectedId(cliente.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cliente.nombre}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {cliente.telefono}
                    </div>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="mt-4 text-sm w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedId(cliente.id)
                  }}
                >
                  Ver detalle completo
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Panel de detalle */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-800">
              Detalle del Cliente
            </h2>
          </div>
          {!selectedId ? (
            <Card className="bg-gray-50 border border-gray-200">
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <p className="text-gray-500">
                  Selecciona un cliente para ver su información completa
                </p>
              </div>
            </Card>
          ) : loadingDetalle ? (
            <Card className="border border-gray-200">
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              </div>
            </Card>
          ) : clienteDetalle ? (
            <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-200">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-teal-200">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {clienteDetalle.nombre}
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium text-gray-700">Teléfono:</span>
                  <span className="text-gray-900">{clienteDetalle.telefono}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-900">{clienteDetalle.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-gray-700">Dirección:</span>
                  <span className="text-gray-900 flex-1">{clienteDetalle.direccion}</span>
                </div>
              </div>

              {clienteDetalle.mascotas && clienteDetalle.mascotas.length > 0 && (
                <div className="mt-5 pt-5 border-t border-teal-200">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h4 className="font-semibold text-gray-800">Mascotas Registradas</h4>
                  </div>
                  <ul className="space-y-2">
                    {clienteDetalle.mascotas.map((mascota) => (
                      <li key={mascota.id} className="flex items-center gap-2 text-sm bg-white/60 rounded-lg p-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </div>
                        <span className="text-gray-900 font-medium">{mascota.nombre}</span>
                        <span className="text-gray-600">({mascota.especie} - {mascota.raza})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ) : (
            <Card className="bg-red-50 border border-red-200">
              <div className="text-center py-6">
                <svg className="w-12 h-12 text-red-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 font-medium">Cliente no encontrado</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClientesPage