/**
 * Datos de ejemplo del panel de clientes.
 * Se reemplazan por la consulta a la base en cuanto quede conectada:
 * basta con que `getClientes()` y `getCliente(id)` devuelvan la misma forma.
 */

const DAY = 24 * 60 * 60 * 1000;
const VENTANA = 90;

const PIEZAS = [
  { nombre: 'El Diamante', precio: 89900 },
  { nombre: 'Collar Cascada', precio: 32700 },
  { nombre: 'Collar Mitchell', precio: 18900 },
  { nombre: 'Cofre de Perlas', precio: 14400 },
  { nombre: 'Collar Lirio', precio: 14400 },
  { nombre: 'Reloj Imperial', precio: 11250 },
  { nombre: 'Pulsera Mar', precio: 11250 },
  { nombre: 'Collar Ámbar', precio: 9850 },
  { nombre: 'Anillos Aurora', precio: 8900 },
  { nombre: 'Cadena Veneciana', precio: 7600 },
];

/*
 * perfil: cuántos pedidos tiene, cada cuántos días compra, cuántos días lleva sin comprar
 * y qué rango de piezas suele llevar (índices de PIEZAS, 0 es la más cara).
 */
const BASE = [
  { id: 'c-1001', nombre: 'Valeria', apellido: 'Montemayor', ciudad: 'Monterrey', desde: 2140, etiquetas: ['VIP', 'Coleccionista', 'Prefiere oro'], perfil: { pedidos: 14, cada: 38, sin: 6, rango: [0, 4] } },
  { id: 'c-1002', nombre: 'Andrés', apellido: 'Ramírez', ciudad: 'Guadalajara', desde: 910, etiquetas: ['Aniversarios', 'Regalos'], perfil: { pedidos: 6, cada: 70, sin: 22, rango: [3, 9] } },
  { id: 'c-1003', nombre: 'Paulina', apellido: 'Cárdenas', ciudad: 'Ciudad de México', desde: 1460, etiquetas: ['Novias', 'Cita privada'], perfil: { pedidos: 9, cada: 55, sin: 12, rango: [1, 6] } },
  { id: 'c-1004', nombre: 'Rodrigo', apellido: 'Salinas', ciudad: 'Querétaro', desde: 520, etiquetas: ['Corporativo'], perfil: { pedidos: 4, cada: 60, sin: 140, rango: [5, 9] } },
  { id: 'c-1005', nombre: 'Mariana', apellido: 'Echeverría', ciudad: 'Mérida', desde: 3050, etiquetas: ['VIP', 'Alta joyería', 'Cita privada'], perfil: { pedidos: 19, cada: 45, sin: 3, rango: [0, 3] } },
  { id: 'c-1006', nombre: 'Luis', apellido: 'Treviño', ciudad: 'Monterrey', desde: 260, etiquetas: ['Nuevo'], perfil: { pedidos: 2, cada: 50, sin: 35, rango: [6, 9] } },
  { id: 'c-1007', nombre: 'Fernanda', apellido: 'Ochoa', ciudad: 'Ciudad de México', desde: 1780, etiquetas: ['Cumpleaños en octubre', 'Prefiere plata'], perfil: { pedidos: 7, cada: 90, sin: 210, rango: [4, 9] } },
  { id: 'c-1008', nombre: 'Jorge', apellido: 'Villaseñor', ciudad: 'Guadalajara', desde: 1200, etiquetas: ['Relojes', 'Coleccionista'], perfil: { pedidos: 8, cada: 48, sin: 18, rango: [2, 5] } },
  { id: 'c-1009', nombre: 'Sofía', apellido: 'Beltrán', ciudad: 'Querétaro', desde: 640, etiquetas: ['Regalos'], perfil: { pedidos: 5, cada: 40, sin: 28, rango: [5, 9] } },
  { id: 'c-1010', nombre: 'Emilio', apellido: 'Garza', ciudad: 'Monterrey', desde: 2480, etiquetas: ['VIP', 'Corporativo'], perfil: { pedidos: 11, cada: 65, sin: 9, rango: [0, 5] } },
  { id: 'c-1011', nombre: 'Camila', apellido: 'Rentería', ciudad: 'Mérida', desde: 880, etiquetas: ['Novias'], perfil: { pedidos: 3, cada: 120, sin: 175, rango: [2, 7] } },
  { id: 'c-1012', nombre: 'Diego', apellido: 'Arriaga', ciudad: 'Ciudad de México', desde: 410, etiquetas: ['Nuevo', 'En línea'], perfil: { pedidos: 3, cada: 30, sin: 15, rango: [6, 9] } },
  { id: 'c-1013', nombre: 'Regina', apellido: 'Lozano', ciudad: 'Guadalajara', desde: 1990, etiquetas: ['Alta joyería', 'Prefiere oro'], perfil: { pedidos: 10, cada: 58, sin: 44, rango: [1, 4] } },
  { id: 'c-1014', nombre: 'Tomás', apellido: 'Iturbide', ciudad: 'Querétaro', desde: 1320, etiquetas: ['Aniversarios'], perfil: { pedidos: 5, cada: 150, sin: 260, rango: [3, 8] } },
];

// Generador pseudoaleatorio con semilla: los datos de ejemplo son estables entre recargas.
function seeded(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function buildPedidos(cliente, hoy) {
  const rand = seeded(cliente.id);
  const { pedidos, cada, sin, rango } = cliente.perfil;
  const lista = [];
  let dias = sin;

  for (let n = 0; n < pedidos && dias <= cliente.desde; n += 1) {
    const piezas = [];
    const cuantas = rand() < 0.3 ? 2 : 1;
    for (let p = 0; p < cuantas; p += 1) {
      const idx = rango[0] + Math.floor(rand() * (rango[1] - rango[0] + 1));
      piezas.push(PIEZAS[idx]);
    }
    lista.push({
      fecha: new Date(hoy - dias * DAY),
      piezas: piezas.map((pieza) => pieza.nombre),
      total: piezas.reduce((sum, pieza) => sum + pieza.precio, 0),
    });
    dias += Math.round(cada * (0.6 + rand() * 0.8));
  }

  // Folio consecutivo: el pedido más antiguo es el 001.
  return lista.map((pedido, i) => ({
    folio: `PT-${cliente.id.slice(2)}-${String(lista.length - i).padStart(3, '0')}`,
    ...pedido,
  }));
}

function tipoDe({ pedidos90, gasto90, totalGastado, diasSinComprar }) {
  if (diasSinComprar > VENTANA) return 'riesgo';
  if (gasto90 >= 40000 || (totalGastado >= 200000 && pedidos90 >= 2)) return 'alto-valor';
  return 'normal';
}

function build() {
  const hoy = Date.now();
  return BASE.map((base) => {
    const pedidos = buildPedidos(base, hoy);
    const recientes = pedidos.filter((pedido) => hoy - pedido.fecha <= VENTANA * DAY);
    const totalGastado = pedidos.reduce((sum, pedido) => sum + pedido.total, 0);
    const stats = {
      pedidos90: recientes.length,
      gasto90: recientes.reduce((sum, pedido) => sum + pedido.total, 0),
      totalGastado,
      totalPedidos: pedidos.length,
      ticketPromedio: pedidos.length ? Math.round(totalGastado / pedidos.length) : 0,
      diasSinComprar: pedidos.length ? Math.round((hoy - pedidos[0].fecha) / DAY) : Infinity,
      ultimaCompra: pedidos[0]?.fecha ?? null,
      clienteDesde: new Date(hoy - base.desde * DAY),
    };
    const { perfil: _perfil, ...datos } = base;
    return {
      ...datos,
      nombreCompleto: `${base.nombre} ${base.apellido}`,
      correo: `${base.nombre}.${base.apellido}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() + '@correo.com',
      pedidos,
      stats: { ...stats, tipo: tipoDe(stats) },
    };
  });
}

const CLIENTES = build();

// Catálogo de etiquetas: qué significa cada una para el equipo de la boutique.
const ETIQUETAS = {
  VIP: 'Cliente preferente: atención de asesora asignada, preventas y eventos privados de la casa.',
  Coleccionista: 'Compra piezas de la misma línea o ediciones limitadas para completar colecciones.',
  'Prefiere oro': 'Elige casi siempre piezas en oro amarillo o rosa.',
  'Prefiere plata': 'Elige casi siempre piezas en plata o platino.',
  Aniversarios: 'Suele comprar para fechas de aniversario; conviene contactarle unas semanas antes.',
  Regalos: 'La mayoría de sus compras son para regalar: ofrecer envoltura y tarjeta.',
  Novias: 'Interesada en anillos de compromiso, argollas o joyería para boda.',
  'Cita privada': 'Prefiere comprar en cita privada fuera del piso de venta.',
  Corporativo: 'Compra a nombre de una empresa, normalmente regalos para su equipo o clientes.',
  'Alta joyería': 'Interesada en piezas únicas o de alto valor, a partir de $30,000.',
  Nuevo: 'Registrado hace menos de un año.',
  'Cumpleaños en octubre': 'Enviar felicitación y propuesta de regalo durante octubre.',
  Relojes: 'Muestra interés especial en relojería.',
  'En línea': 'Compra principalmente en la tienda en línea.',
};

export function getEtiqueta(nombre) {
  return {
    nombre,
    descripcion: ETIQUETAS[nombre] ?? 'Etiqueta sin descripción.',
    clientes: CLIENTES.filter((cliente) => cliente.etiquetas.includes(nombre)).length,
  };
}

export const TIPOS = {
  'alto-valor': { label: 'Alto valor', tone: 'mint' },
  normal: { label: 'Normal', tone: 'sky' },
  riesgo: { label: 'En riesgo', tone: 'rose' },
};

export function getClientes() {
  return CLIENTES;
}

export function getCliente(id) {
  return CLIENTES.find((cliente) => cliente.id === id) ?? null;
}

export const money = (value) => `$${value.toLocaleString('es-MX')}`;

export const fecha = (date) =>
  date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });

export function antiguedad(desde) {
  const meses = Math.floor((Date.now() - desde) / (30.44 * DAY));
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  if (anios === 0) return `${Math.max(meses, 1)} ${meses === 1 ? 'mes' : 'meses'}`;
  const a = `${anios} ${anios === 1 ? 'año' : 'años'}`;
  return resto ? `${a} ${resto} ${resto === 1 ? 'mes' : 'meses'}` : a;
}
