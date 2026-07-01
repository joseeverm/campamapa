import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  SparklesIcon,
  CheckIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid'
import { saveCampista } from '../services/storage'

const NIVELES = ['semilla', 'raiz', 'tallo', 'hoja', 'flor', 'fruto', 'pergamino']

async function geocodificar(municipio, departamento) {
  const query = `${municipio}, ${departamento}, Colombia`
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
  const res = await fetch(url, {
    headers: { 'Accept-Language': 'es' }
  })
  const data = await res.json()
  if (data.length === 0) return null
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
}

const inputClase =
  'block w-full rounded-xl border border-forest-200 bg-white px-3 py-2.5 text-forest-900 shadow-sm transition-colors focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200'

const labelClase = 'mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-forest-700'

export default function AgregarCampista() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    municipio: '',
    departamento: '',
    telefono: '',
    nivel: 'tallo',
  })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.nombre || !form.municipio || !form.departamento) {
      setError('Nombre, municipio y departamento son obligatorios.')
      return
    }

    setCargando(true)
    const coords = await geocodificar(form.municipio, form.departamento)
    setCargando(false)

    if (!coords) {
      setError(`No se encontró "${form.municipio}, ${form.departamento}" en el mapa. Revisa el nombre.`)
      return
    }

    const campista = {
      id: uuidv4(),
      ...form,
      lat: coords.lat,
      lng: coords.lng,
    }

    saveCampista(campista)
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-forest-800">
        <PlusCircleIcon className="h-6 w-6 text-forest-600" />
        Agregar campista
      </h2>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-card">
        <label className={labelClase}>
          <UserIcon className="h-4 w-4 text-forest-500" />
          Nombre completo
        </label>
        <input name="nombre" value={form.nombre} onChange={handleChange} className={`${inputClase} mb-4`} />

        <label className={labelClase}>
          <MapPinIcon className="h-4 w-4 text-forest-500" />
          Municipio
        </label>
        <input
          name="municipio"
          value={form.municipio}
          onChange={handleChange}
          className={`${inputClase} mb-4`}
          placeholder="Ej: Isnos"
        />

        <label className={labelClase}>
          <MapPinIcon className="h-4 w-4 text-forest-500" />
          Departamento
        </label>
        <input
          name="departamento"
          value={form.departamento}
          onChange={handleChange}
          className={`${inputClase} mb-4`}
          placeholder="Ej: Huila"
        />

        <label className={labelClase}>
          <PhoneIcon className="h-4 w-4 text-forest-500" />
          Teléfono
        </label>
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          className={`${inputClase} mb-4`}
          placeholder="Opcional"
        />

        <label className={labelClase}>
          <SparklesIcon className="h-4 w-4 text-forest-500" />
          Nivel
        </label>
        <select name="nivel" value={form.nivel} onChange={handleChange} className={`${inputClase} mb-4 capitalize`}>
          {NIVELES.map(n => <option key={n} value={n}>{n}</option>)}
        </select>

        {error && <p className="mb-4 text-sm font-medium text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white shadow-soft transition-colors ${
            cargando ? 'cursor-not-allowed bg-forest-300' : 'bg-forest-600 hover:bg-forest-700'
          }`}
        >
          {cargando ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Buscando ubicación...
            </>
          ) : (
            <>
              <CheckIcon className="h-5 w-5" />
              Guardar campista
            </>
          )}
        </button>
      </form>
    </div>
  )
}
