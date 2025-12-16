import { useState } from "react"
import { useMascotas, useMascotaDetalle } from "../hooks/useMascotas"
import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"

function MascotasPage() {
  const { mascotas, loading } = useMascotas()
  const [selectedId, setSelectedId] = useState(null)
  const { mascota: mascotaDetalle, loading: loadingDetalle } = useMascotaDetalle(selectedId)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando mascotas...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Mascotas</h1>
      <p className="text-gray-500 mb-6">
        📋 Listado via <span className="font-mono bg-blue-100 px-1 rounded">REST API</span>
        {" | "}
        🔍 Detalle via <span className="font-mono bg-purple-100 px-1 rounded">GraphQL</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Listado de mascotas */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Listado (REST)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mascotas.map((mascota) => (
              <Card
                key={mascota.id}
                className={`cursor-pointer transition-all ${
                  selectedId === mascota.id
                    ? "ring-2 ring-green-500"
                    : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedId(mascota.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {mascota.especie === "Perro" ? "🐕" : "🐱"} {mascota.nombre}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {mascota.especie} • {mascota.raza}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Dueño: {mascota.cliente?.nombre}
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="mt-3 text-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedId(mascota.id)
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
                Selecciona una mascota para ver su detalle
              </p>
            </Card>
          ) : loadingDetalle ? (
            <Card>
              <p className="text-gray-500">Cargando detalle...</p>
            </Card>
          ) : mascotaDetalle ? (
            <Card className="bg-green-50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {mascotaDetalle.especie === "Perro" ? "🐕" : "🐱"} {mascotaDetalle.nombre}
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Especie:</span> {mascotaDetalle.especie}</p>
                <p><span className="font-medium">Raza:</span> {mascotaDetalle.raza}</p>
                <p><span className="font-medium">Edad:</span> {mascotaDetalle.edad} años</p>
                <p><span className="font-medium">Peso:</span> {mascotaDetalle.peso} kg</p>
              </div>

              <div className="mt-4 pt-4 border-t border-green-200">
                <h4 className="font-semibold text-gray-700 mb-2">📋 Historial Médico:</h4>
                <p className="text-sm text-gray-600">{mascotaDetalle.historialMedico}</p>
              </div>

              {mascotaDetalle.cliente && (
                <div className="mt-4 pt-4 border-t border-green-200">
                  <h4 className="font-semibold text-gray-700 mb-2">👤 Dueño:</h4>
                  <div className="text-sm text-gray-600">
                    <p>{mascotaDetalle.cliente.nombre}</p>
                    <p>📞 {mascotaDetalle.cliente.telefono}</p>
                    <p>📧 {mascotaDetalle.cliente.email}</p>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <Card className="bg-red-50">
              <p className="text-red-500">Mascota no encontrada</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default MascotasPage