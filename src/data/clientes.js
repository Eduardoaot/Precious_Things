/**
 * Textos de presentación del panel. Los datos salen de la API (vistas de bd_laquinta).
 */

export const TIPOS = {
  'alto-valor': { label: 'Alto valor', tone: 'mint' },
  normal: { label: 'Normal', tone: 'sky' },
  riesgo: { label: 'En riesgo', tone: 'rose' },
};

export const money = (value) => `$${Number(value).toLocaleString('es-MX')}`;
