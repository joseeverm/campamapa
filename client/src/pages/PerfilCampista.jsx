import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { ArrowLeftIcon, PhoneIcon, TrashIcon } from '@heroicons/react/24/solid'
import { getCampistas, deleteCampista } from '../services/storage'
import { estiloNivel, inicial } from '../utils/niveles'
import '../utils/leafletIconFix'

export default function PerfilCampista() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [campista, setCampista] = useState(null)

  useEffect(() => {
    const lista = getCampistas()
    const encontrado = lista.find(c => c.id === id)
    if (!encontrado) navigate('/campistas')
    else setCampista(encontrado)
  }, [id])

  function handleDelete() {
    if (!confirm('¿Eliminar este campista?')) return
    deleteCampista(id)
    navigate('/campistas')
  }

  if (!campista) return null

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <button
        onClick={() => navigate('/campistas')}
        className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:text-forest-800"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Volver
      </button>

      <div className="mb-5 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white ${estiloNivel(campista.nivel).solid}`}
        >
          {inicial(campista.nombre)}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-extrabold text-forest-900">{campista.nombre}</h2>
          <p className="truncate text-sm text-forest-500">
            {campista.municipio}, {campista.departamento}
          </p>
          <span
            className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${estiloNivel(campista.nivel).badge}`}
          >
            {campista.nivel}
          </span>
        </div>
      </div>

      {campista.telefono && (
        <a
          href={`tel:${campista.telefono}`}
          className="mb-5 flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-sky-600"
        >
          <PhoneIcon className="h-5 w-5" />
          {campista.telefono}
        </a>
      )}

      <div className="mb-5 h-64 overflow-hidden rounded-2xl shadow-card">
        <MapContainer
          center={[campista.lat, campista.lng]}
          zoom={12}
          className="h-full w-full"
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.stamen.com/">Stamen Design</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[campista.lat, campista.lng]}>
            <Popup>{campista.nombre}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <button
        onClick={handleDelete}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-rose-600"
      >
        <TrashIcon className="h-5 w-5" />
        Eliminar campista
      </button>
    </div>
  )
}
