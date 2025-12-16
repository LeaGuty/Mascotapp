import { http, HttpResponse } from "msw"
import { db } from "../data/db"

// ============================================
// REST API - Solo para LISTADOS
// ============================================

export const restHandlers = [
  // GET /api/clientes - Listar todos los clientes
  http.get("/api/clientes", () => {
    console.log("[REST] GET /api/clientes")
    return HttpResponse.json(db.clientes)
  }),

  // GET /api/mascotas - Listar todas las mascotas (con info básica del dueño)
  http.get("/api/mascotas", () => {
    console.log("[REST] GET /api/mascotas")
    const mascotasConDueño = db.mascotas.map((mascota) => {
      const cliente = db.clientes.find((c) => c.id === mascota.clienteId)
      return {
        ...mascota,
        cliente: cliente ? { id: cliente.id, nombre: cliente.nombre } : null,
      }
    })
    return HttpResponse.json(mascotasConDueño)
  }),

  // GET /api/citas - Listar citas (filtradas por fecha, máximo 8)
  http.get("/api/citas", ({ request }) => {
    const url = new URL(request.url)
    const fecha = url.searchParams.get("fecha")
    console.log(`[REST] GET /api/citas?fecha=${fecha}`)

    let citas = db.citas

    // Filtrar por fecha si se proporciona
    if (fecha) {
      citas = citas.filter((c) => c.fecha === fecha)
    }

    // Limitar a 8 citas por día (requisito del caso)
    citas = citas.slice(0, 8)

    // Agregar info básica de mascota, cliente y veterinario
    const citasConInfo = citas.map((cita) => {
      const mascota = db.mascotas.find((m) => m.id === cita.mascotaId)
      const veterinario = db.veterinarios.find((v) => v.id === cita.veterinarioId)
      const cliente = mascota ? db.clientes.find((c) => c.id === mascota.clienteId) : null
      return {
        ...cita,
        mascota: mascota ? { id: mascota.id, nombre: mascota.nombre } : null,
        veterinario: veterinario ? { id: veterinario.id, nombre: veterinario.nombre } : null,
        cliente: cliente ? { id: cliente.id, nombre: cliente.nombre } : null,
      }
    })

    return HttpResponse.json(citasConInfo)
  }),

  // GET /api/veterinarios - Listar veterinarios
  http.get("/api/veterinarios", () => {
    console.log("[REST] GET /api/veterinarios")
    return HttpResponse.json(db.veterinarios)
  }),
]