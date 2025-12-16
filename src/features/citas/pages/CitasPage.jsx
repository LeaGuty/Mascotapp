import { useState } from "react"
import { useCitas, useCitaDetalle } from "../hooks/useCitas"
import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"

function CitasPage() {
  const { citas, loading, fechaSeleccionada, cambiarFecha } = useCitas()
  const [selectedId, setSelectedId] = useState(null)
  const { cita: citaDetalle, loading: loadingDetalle } = useCitaDetalle(selectedId)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Citas</h1>
        <p className="text-gray-600">
          Listado via <span className="font-mono bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">REST API</span>
          {" • "}
          Detalle via <span className="font-mono bg-purple-100 text-purple-700 px-2 py-0.5 rounded">GraphQL</span>
        </p>
      </div>

      {/* Selector de fecha */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Filtrar por fecha:
        </label>
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => cambiarFecha(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando citas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Listado de citas */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800">
                  Citas Programadas
                </h2>
              </div>
              <span className="text-sm text-gray-500">
                {fechaSeleccionada}
              </span>
            </div>
            {citas.length === 0 ? (
              <Card className="bg-gray-50 border border-gray-200">
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">
                    No hay citas programadas para esta fecha
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {citas.map((cita) => (
                  <Card
                    key={cita.id}
                    className={`cursor-pointer transition-all border ${
                      selectedId === cita.id
                        ? "ring-2 ring-indigo-500 border-indigo-300 shadow-lg"
                        : "border-gray-100 hover:shadow-xl hover:border-indigo-200"
                    }`}
                    onClick={() => setSelectedId(cita.id)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <div className="text-center">
                            <div className="text-white text-lg font-bold leading-tight">
                              {cita.hora}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">
                            {cita.mascota?.nombre}
                          </h3>
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {cita.cliente?.nombre}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Dr. {cita.veterinario?.nombre}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col gap-2">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            cita.estado === "Confirmada"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {cita.estado}
                        </span>
                        <Button
                          variant="secondary"
                          className="text-sm whitespace-nowrap"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedId(cita.id)
                          }}
                        >
                          Ver detalle
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Panel de detalle */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">
                Detalle de la Cita
              </h2>
            </div>
            {!selectedId ? (
              <Card className="bg-gray-50 border border-gray-200">
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <p className="text-gray-500">
                    Selecciona una cita para ver su información completa
                  </p>
                </div>
              </Card>
            ) : loadingDetalle ? (
              <Card className="border border-gray-200">
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              </Card>
            ) : citaDetalle ? (
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
                <div className="text-center mb-6 pb-5 border-b border-indigo-200">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {citaDetalle.hora}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {citaDetalle.fecha}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h4 className="font-semibold text-gray-800">Motivo de Consulta</h4>
                    </div>
                    <p className="text-sm text-gray-700 bg-white/60 rounded-lg p-3 leading-relaxed">
                      {citaDetalle.motivo}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="font-semibold text-gray-800">Estado</h4>
                    </div>
                    <span
                      className={`inline-block px-3 py-1.5 text-xs font-medium rounded-lg ${
                        citaDetalle.estado === "Confirmada"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {citaDetalle.estado}
                    </span>
                  </div>

                  {citaDetalle.mascota && (
                    <div className="pt-4 border-t border-indigo-200">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h4 className="font-semibold text-gray-800">Paciente</h4>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-900">
                          {citaDetalle.mascota.nombre} ({citaDetalle.mascota.especie})
                        </p>
                        {citaDetalle.mascota.cliente && (
                          <div className="mt-2 pt-2 border-t border-indigo-100 space-y-1.5">
                            <p className="text-xs text-gray-600 font-medium">Propietario:</p>
                            <p className="text-sm text-gray-900">
                              {citaDetalle.mascota.cliente.nombre}
                            </p>
                            <div className="flex items-center gap-1.5 text-sm text-gray-700">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {citaDetalle.mascota.cliente.telefono}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {citaDetalle.veterinario && (
                    <div className="pt-4 border-t border-indigo-200">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <h4 className="font-semibold text-gray-800">Veterinario Asignado</h4>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-900">
                          Dr. {citaDetalle.veterinario.nombre}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {citaDetalle.veterinario.especialidad}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="bg-red-50 border border-red-200">
                <div className="text-center py-6">
                  <svg className="w-12 h-12 text-red-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-600 font-medium">Cita no encontrada</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CitasPage