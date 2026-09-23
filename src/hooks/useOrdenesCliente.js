import { useEffect, useState } from 'react';
import { fetchCliente, fetchEtiquetas } from '../services/clientesApi';

const CARGANDO = { cargando: true, error: null, datos: null, conteoEtiquetas: {} };

export default function useOrdenesCliente(id) {
  const [estado, setEstado] = useState({ ...CARGANDO, id });

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetchCliente(id, controller.signal),
      // Si el catálogo falla, la ficha se muestra igual y solo faltan los conteos.
      fetchEtiquetas(controller.signal).catch(() => ({})),
    ])
      .then(([datos, conteoEtiquetas]) =>
        setEstado({ id, cargando: false, error: null, datos, conteoEtiquetas })
      )
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setEstado({ id, cargando: false, error, datos: null, conteoEtiquetas: {} });
      });

    return () => controller.abort();
  }, [id]);

  // Al cambiar de cliente el estado anterior ya no sirve: se muestra la carga.
  return estado.id === id ? estado : CARGANDO;
}
