import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setMascotas,
  setLoading,
  selectMascotas,
  selectMascotasLoading,
} from "../../../store/slices/mascotasSlice"
import { graphqlRequest, GET_MASCOTA_DETALLE } from "../../../services/graphqlClient"

// Hook para obtener LISTADO de mascotas (REST)
export function useMascotas() {
  const dispatch = useDispatch()
  const mascotas = useSelector(selectMascotas)
  const loading = useSelector(selectMascotasLoading)

  useEffect(() => {
    const fetchMascotas = async () => {
      dispatch(setLoading(true))
      try {
        const response = await fetch("/api/mascotas")
        const data = await response.json()
        dispatch(setMascotas(data))
      } catch (error) {
        console.error("Error fetching mascotas:", error)
      } finally {
        dispatch(setLoading(false))
      }
    }

    if (mascotas.length === 0) {
      fetchMascotas()
    }
  }, [dispatch, mascotas.length])

  return { mascotas, loading }
}

// Hook para obtener DETALLE de una mascota (GraphQL)
export function useMascotaDetalle(id) {
  const [mascota, setMascota] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setMascota(null)
      return
    }

    const fetchDetalle = async () => {
      setLoading(true)
      try {
        const data = await graphqlRequest(GET_MASCOTA_DETALLE, { id })
        setMascota(data.mascota)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDetalle()
  }, [id])

  return { mascota, loading, error }
}