// Mapa de estilos por nivel de campista, usado en Mapa, Campistas y PerfilCampista.
export const NIVEL_ESTILOS = {
  semilla: { badge: 'bg-lime-100 text-lime-700', solid: 'bg-lime-500' },
  raiz: { badge: 'bg-amber-100 text-amber-700', solid: 'bg-amber-600' },
  tallo: { badge: 'bg-green-100 text-green-700', solid: 'bg-green-600' },
  hoja: { badge: 'bg-emerald-100 text-emerald-700', solid: 'bg-emerald-600' },
  flor: { badge: 'bg-pink-100 text-pink-700', solid: 'bg-pink-500' },
  fruto: { badge: 'bg-orange-100 text-orange-700', solid: 'bg-orange-500' },
  pergamino: { badge: 'bg-forest-100 text-forest-800', solid: 'bg-forest-700' },
}

const DEFAULT_ESTILO = { badge: 'bg-forest-100 text-forest-700', solid: 'bg-forest-600' }

export function estiloNivel(nivel) {
  return NIVEL_ESTILOS[nivel] || DEFAULT_ESTILO
}

export function inicial(nombre) {
  return (nombre || '?').trim().charAt(0).toUpperCase()
}
