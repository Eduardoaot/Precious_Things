import { useEffect, useState } from 'react';
import { fetchClientes, fetchEtiquetas, fetchKpis } from '../services/clientesApi';

const VACIO = { cargando: true, error: null, clientes: [], kpis: null, conteoEtiquetas: {} };

export default function useClientes() {
  const [estado, setEstado] = useState(VACIO);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetchClientes(controller.signal),
      fetchKpis(controller.signal),
      fetchEtiquetas(controller.signal).catch(() => ({})),
    ])
      .then(([clientes, kpis, conteoEtiquetas]) =>
        setEstado({ cargando: false, error: null, clientes, kpis, conteoEtiquetas })
      )
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setEstado({ ...VACIO, cargando: false, error });
      });

    return () => controller.abort();
  }, []);

  return estado;
}
