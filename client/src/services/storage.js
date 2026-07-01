const KEY = 'campamapa_campistas'

export function getCampistas() {
  return JSON.parse(localStorage.getItem(KEY) || '[]')
}

export function saveCampista(campista) {
  const lista = getCampistas()
  lista.push(campista)
  localStorage.setItem(KEY, JSON.stringify(lista))
}

export function deleteCampista(id) {
  const lista = getCampistas().filter(c => c.id !== id)
  localStorage.setItem(KEY, JSON.stringify(lista))
}