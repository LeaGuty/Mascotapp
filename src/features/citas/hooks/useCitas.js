import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setCitas,
  setLoading,
  setFechaSeleccionada,
  selectCitas,
  selectCitasLoading,
  selectFechaSeleccionada,
} from "../../../store/slices/citasSlice"
import { graphqlRequest, GET_CITA_DETALLE } from "../../../services/graphqlClient"

// Hook para obtener LISTADO de citas (REST)
export function useCitas() {
  const dispatch = useDispatch()
  const citas = useSelector(selectCitas)
  const loading = useSelector(selectCitasLoading)
  const fechaSeleccionada = useSelector(selectFechaSeleccionada)

  const fetchCitas = async (fecha) => {
    dispatch(setLoading(true))
    try {
      const response = await fetch(`/api/citas?fecha=${fecha}`)
      const data = await response.json()
      dispatch(setCitas(data))
    } catch (error) {
      console.error("Error fetching citas:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchCitas(fechaSeleccionada)
  }, [fechaSeleccionada])

  const cambiarFecha = (nuevaFecha) => {
    dispatch(setFechaSeleccionada(nuevaFecha))
  }

  return { citas, loading, fechaSeleccionada, cambiarFecha }
}

// Hook para obtener DETALLE de una cita (GraphQL)
export function useCitaDetalle(id) {
  const [cita, setCita] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setCita(null)
      return
    }

    const fetchDetalle = async () => {
      setLoading(true)
      try {
        const data = await graphqlRequest(GET_CITA_DETALLE, { id })
        setCita(data.cita)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDetalle()
  }, [id])

  return { cita, loading, error }
}