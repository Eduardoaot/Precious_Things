const BASE = import.meta.env.VITE_API_URL ?? '/api';

async function pedir(ruta, signal) {
  const response = await fetch(`${BASE}${ruta}`, { signal });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.error ?? 'No se pudo consultar la base de datos');
    error.status = response.status;
    throw error;
  }

  return data;
}

export const fetchCliente = (id, signal) => pedir(`/clientes/${encodeURIComponent(id)}`, signal);

export const fetchClientes = (signal) => pedir('/clientes', signal);

export const fetchKpis = (signal) => pedir('/kpis', signal);

export const fetchEtiquetas = (signal) => pedir('/etiquetas', signal);
