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
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Citas del Día</h1>
      <p className="text-gray-500 mb-6">
        📋 Listado via <span className="font-mono bg-blue-100 px-1 rounded">REST API</span>
        {" | "}
        🔍 Detalle via <span className="font-mono bg-purple-100 px-1 rounded">GraphQL</span>
      </p>

      {/* Selector de fecha */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por fecha:
        </label>
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => cambiarFecha(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Citas programadas - {fechaSeleccionada} (máx. 8)
            </h2>
            {citas.length === 0 ? (
              <Card className="bg-gray-50">
                <p className="text-gray-500 text-center">
                  No hay citas programadas para esta fecha
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {citas.map((cita) => (
                  <Card
                    key={cita.id}
                    className={`cursor-pointer transition-all ${
                      selectedId === cita.id
                        ? "ring-2 ring-orange-500"
                        : "hover:shadow-lg"
                    }`}
                    onClick={() => setSelectedId(cita.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-orange-500">
                          {cita.hora}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {cita.mascota?.nombre}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Dueño: {cita.cliente?.nombre}
                          </p>
                          <p className="text-sm text-gray-500">
                            Veterinario: {cita.veterinario?.nombre}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            cita.estado === "Confirmada"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {cita.estado}
                        </span>
                        <Button
                          variant="secondary"
                          className="mt-2 text-sm block"
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
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Detalle (GraphQL)
            </h2>
            {!selectedId ? (
              <Card className="bg-gray-50">
                <p className="text-gray-500 text-center">
                  Selecciona una cita para ver su detalle
                </p>
              </Card>
            ) : loadingDetalle ? (
              <Card>
                <p className="text-gray-500">Cargando detalle...</p>
              </Card>
            ) : citaDetalle ? (
              <Card className="bg-orange-50">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-orange-500">
                    {citaDetalle.hora}
                  </span>
                  <p className="text-sm text-gray-500">{citaDetalle.fecha}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">📋 Motivo:</h4>
                    <p className="text-sm text-gray-600">{citaDetalle.motivo}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Estado:</h4>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        citaDetalle.estado === "Confirmada"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {citaDetalle.estado}
                    </span>
                  </div>

                  {citaDetalle.mascota && (
                    <div className="pt-4 border-t border-orange-200">
                      <h4 className="font-semibold text-gray-700 mb-1">🐾 Mascota:</h4>
                      <p className="text-sm text-gray-600">
                        {citaDetalle.mascota.nombre} ({citaDetalle.mascota.especie})
                      </p>
                      {citaDetalle.mascota.cliente && (
                        <p className="text-sm text-gray-500">
                          Dueño: {citaDetalle.mascota.cliente.nombre}
                          <br />
                          📞 {citaDetalle.mascota.cliente.telefono}
                        </p>
                      )}
                    </div>
                  )}

                  {citaDetalle.veterinario && (
                    <div className="pt-4 border-t border-orange-200">
                      <h4 className="font-semibold text-gray-700 mb-1">👨‍⚕️ Veterinario:</h4>
                      <p className="text-sm text-gray-600">
                        {citaDetalle.veterinario.nombre}
                      </p>
                      <p className="text-sm text-gray-500">
                        {citaDetalle.veterinario.especialidad}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="bg-red-50">
                <p className="text-red-500">Cita no encontrada</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CitasPage