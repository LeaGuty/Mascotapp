import { graphql, HttpResponse } from "msw"
import { getClienteConMascotas, getMascotaCompleta, getCitaCompleta } from "../data/db"

// ============================================
// GraphQL API - Solo para DETALLES
// ============================================

export const graphqlHandlers = [
  // Query: obtener detalle de un cliente por ID
  graphql.query("GetClienteDetalle", ({ variables }) => {
    console.log(`[GraphQL] Query GetClienteDetalle - id: ${variables.id}`)
    const cliente = getClienteConMascotas(Number(variables.id))

    if (!cliente) {
      return HttpResponse.json({
        errors: [{ message: "Cliente no encontrado" }],
      })
    }

    return HttpResponse.json({
      data: { cliente },
    })
  }),

  // Query: obtener detalle de una mascota por ID
  graphql.query("GetMascotaDetalle", ({ variables }) => {
    console.log(`[GraphQL] Query GetMascotaDetalle - id: ${variables.id}`)
    const mascota = getMascotaCompleta(Number(variables.id))

    if (!mascota) {
      return HttpResponse.json({
        errors: [{ message: "Mascota no encontrada" }],
      })
    }

    return HttpResponse.json({
      data: { mascota },
    })
  }),

  // Query: obtener detalle de una cita por ID
  graphql.query("GetCitaDetalle", ({ variables }) => {
    console.log(`[GraphQL] Query GetCitaDetalle - id: ${variables.id}`)
    const cita = getCitaCompleta(Number(variables.id))

    if (!cita) {
      return HttpResponse.json({
        errors: [{ message: "Cita no encontrada" }],
      })
    }

    return HttpResponse.json({
      data: { cita },
    })
  }),
]