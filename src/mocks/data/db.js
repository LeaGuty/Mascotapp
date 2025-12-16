// Base de datos mock - simula los datos del backend
export const db = {
  clientes: [
    {
      id: 1,
      nombre: "Juan Pérez",
      telefono: "912345678",
      direccion: "Av. Principal 123, Santiago",
      email: "juan.perez@email.com",
    },
    {
      id: 2,
      nombre: "María García",
      telefono: "923456789",
      direccion: "Calle Los Aromos 456, Providencia",
      email: "maria.garcia@email.com",
    },
    {
      id: 3,
      nombre: "Carlos López",
      telefono: "934567890",
      direccion: "Pasaje El Sol 789, Las Condes",
      email: "carlos.lopez@email.com",
    },
    {
      id: 4,
      nombre: "Ana Martínez",
      telefono: "945678901",
      direccion: "Av. Los Leones 321, Ñuñoa",
      email: "ana.martinez@email.com",
    },
  ],

  mascotas: [
    {
      id: 1,
      nombre: "Max",
      especie: "Perro",
      raza: "Labrador",
      edad: 3,
      peso: 28.5,
      clienteId: 1,
      historialMedico: "Vacunas al día. Alergia leve al pollo.",
    },
    {
      id: 2,
      nombre: "Luna",
      especie: "Gato",
      raza: "Siamés",
      edad: 2,
      peso: 4.2,
      clienteId: 1,
      historialMedico: "Esterilizada. Sin condiciones previas.",
    },
    {
      id: 3,
      nombre: "Rocky",
      especie: "Perro",
      raza: "Bulldog",
      edad: 5,
      peso: 22.0,
      clienteId: 2,
      historialMedico: "Problemas respiratorios leves. Control cada 6 meses.",
    },
    {
      id: 4,
      nombre: "Michi",
      especie: "Gato",
      raza: "Persa",
      edad: 4,
      peso: 5.1,
      clienteId: 3,
      historialMedico: "Vacunas al día. Tratamiento para bolas de pelo.",
    },
    {
      id: 5,
      nombre: "Toby",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: 1,
      peso: 15.3,
      clienteId: 4,
      historialMedico: "Cachorro. Vacunación en proceso.",
    },
  ],

  veterinarios: [
    { id: 1, nombre: "Dra. Patricia Soto", especialidad: "Medicina General" },
    { id: 2, nombre: "Dr. Roberto Díaz", especialidad: "Cirugía" },
    { id: 3, nombre: "Dra. Carmen Ruiz", especialidad: "Dermatología" },
  ],

  citas: [
    {
      id: 1,
      fecha: new Date().toISOString().split("T")[0],
      hora: "09:00",
      mascotaId: 1,
      veterinarioId: 1,
      motivo: "Control general",
      estado: "Confirmada",
    },
    {
      id: 2,
      fecha: new Date().toISOString().split("T")[0],
      hora: "09:30",
      mascotaId: 3,
      veterinarioId: 2,
      motivo: "Revisión respiratoria",
      estado: "Confirmada",
    },
    {
      id: 3,
      fecha: new Date().toISOString().split("T")[0],
      hora: "10:00",
      mascotaId: 2,
      veterinarioId: 1,
      motivo: "Vacunación anual",
      estado: "Pendiente",
    },
    {
      id: 4,
      fecha: new Date().toISOString().split("T")[0],
      hora: "11:00",
      mascotaId: 5,
      veterinarioId: 1,
      motivo: "Segunda dosis vacuna",
      estado: "Confirmada",
    },
    {
      id: 5,
      fecha: new Date().toISOString().split("T")[0],
      hora: "11:30",
      mascotaId: 4,
      veterinarioId: 3,
      motivo: "Problema en la piel",
      estado: "Confirmada",
    },
  ],
}

// Funciones helper para obtener datos relacionados
export const getClienteConMascotas = (clienteId) => {
  const cliente = db.clientes.find((c) => c.id === clienteId)
  if (!cliente) return null
  const mascotas = db.mascotas.filter((m) => m.clienteId === clienteId)
  return { ...cliente, mascotas }
}

export const getMascotaCompleta = (mascotaId) => {
  const mascota = db.mascotas.find((m) => m.id === mascotaId)
  if (!mascota) return null
  const cliente = db.clientes.find((c) => c.id === mascota.clienteId)
  return { ...mascota, cliente }
}

export const getCitaCompleta = (citaId) => {
  const cita = db.citas.find((c) => c.id === citaId)
  if (!cita) return null
  const mascota = db.mascotas.find((m) => m.id === cita.mascotaId)
  const veterinario = db.veterinarios.find((v) => v.id === cita.veterinarioId)
  const cliente = mascota ? db.clientes.find((c) => c.id === mascota.clienteId) : null
  return { ...cita, mascota: mascota ? { ...mascota, cliente } : null, veterinario }
}