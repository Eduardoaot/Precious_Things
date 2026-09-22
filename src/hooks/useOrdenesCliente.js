import { useEffect, useState } from 'react';
import { fetchOrdenesDeCliente } from '../services/clientesApi';

const CARGANDO = { cargando: true, error: null, datos: null };

export default function useOrdenesCliente(id) {
  const [estado, setEstado] = useState({ ...CARGANDO, id });

  useEffect(() => {
    const controller = new AbortController();

    fetchOrdenesDeCliente(id, controller.signal)
      .then((datos) => setEstado({ id, cargando: false, error: null, datos }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setEstado({ id, cargando: false, error, datos: null });
      });

    return () => controller.abort();
  }, [id]);

  // Al cambiar de cliente el estado anterior ya no sirve: se muestra la carga.
  return estado.id === id ? estado : CARGANDO;
}
