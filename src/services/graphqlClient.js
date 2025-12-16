// Cliente GraphQL simple (sin dependencias externas)
const GRAPHQL_ENDPOINT = "/graphql"

export async function graphqlRequest(query, variables = {}) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

// ============================================
// Queries para obtener DETALLES
// ============================================

export const GET_CLIENTE_DETALLE = `
  query GetClienteDetalle($id: ID!) {
    cliente(id: $id) {
      id
      nombre
      telefono
      email
      direccion
      mascotas {
        id
        nombre
        especie
        raza
        edad
      }
    }
  }
`

export const GET_MASCOTA_DETALLE = `
  query GetMascotaDetalle($id: ID!) {
    mascota(id: $id) {
      id
      nombre
      especie
      raza
      edad
      peso
      historialMedico
      cliente {
        id
        nombre
        telefono
        email
      }
    }
  }
`

export const GET_CITA_DETALLE = `
  query GetCitaDetalle($id: ID!) {
    cita(id: $id) {
      id
      fecha
      hora
      motivo
      estado
      mascota {
        id
        nombre
        especie
        cliente {
          id
          nombre
          telefono
        }
      }
      veterinario {
        id
        nombre
        especialidad
      }
    }
  }
`