import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setClientes,
  setLoading,
  selectClientes,
  selectClientesLoading,
} from "../../../store/slices/clientesSlice"
import { graphqlRequest, GET_CLIENTE_DETALLE } from "../../../services/graphqlClient"

// Hook para obtener LISTADO de clientes (REST)
export function useClientes() {
  const dispatch = useDispatch()
  const clientes = useSelector(selectClientes)
  const loading = useSelector(selectClientesLoading)

  useEffect(() => {
    const fetchClientes = async () => {
      dispatch(setLoading(true))
      try {
        // REST API para listado
        const response = await fetch("/api/clientes")
        const data = await response.json()
        dispatch(setClientes(data))
      } catch (error) {
        console.error("Error fetching clientes:", error)
      } finally {
        dispatch(setLoading(false))
      }
    }

    if (clientes.length === 0) {
      fetchClientes()
    }
  }, [dispatch, clientes.length])

  return { clientes, loading }
}

// Hook para obtener DETALLE de un cliente (GraphQL)
export function useClienteDetalle(id) {
  const [cliente, setCliente] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDetalle = async () => {
      setLoading(true)
      try {
        // GraphQL para detalle
        const data = await graphqlRequest(GET_CLIENTE_DETALLE, { id })
        setCliente(data.cliente)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchDetalle()
    }
  }, [id])

  return { cliente, loading, error }
}