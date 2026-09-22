const BASE = import.meta.env.VITE_API_URL ?? '/api';

export async function fetchOrdenesDeCliente(id, signal) {
  const response = await fetch(`${BASE}/clientes/${encodeURIComponent(id)}/ordenes`, { signal });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.error ?? 'No se pudo consultar la base de datos');
    error.status = response.status;
    throw error;
  }

  return data;
}
