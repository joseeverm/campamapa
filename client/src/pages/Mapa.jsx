import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import { getCampistas } from '../services/storage'
import '../utils/leafletIconFix'

const COLOMBIA_CENTER = [4.5709, -74.2973]
const COLOMBIA_BOUNDS = [
  [-4.2316, -81.8357],
  [13.3903, -66.8470],
]

export default function Mapa() {
  const [campistas, setCampistas] = useState([])
  const [geodata, setGeodata] = useState(null)

  useEffect(() => {
    setCampistas(getCampistas())
    fetch('/colombia-departamentos.json')
      .then(res => res.json())
      .then(data => setGeodata(data))
  }, [])

  const estiloFronteras = {
    color: '#ffffff',
    weight: 1.5,
    opacity: 0.6,
    fillOpacity: 0,
  }

  return (
    <div style={{ height: 'calc(100vh - 70px)' }}>
      <MapContainer
        center={COLOMBIA_CENTER}
        zoom={6}
        minZoom={5}
        maxZoom={18}
        maxBounds={COLOMBIA_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
        />
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}{r}.png"
          attribution='&copy; Stadia Maps'
        />
        {geodata && (
          <GeoJSON data={geodata} style={estiloFronteras} />
        )}
        {campistas.map(c => (
          <Marker key={c.id} position={[c.lat, c.lng]}>
            <Popup>
              <strong>{c.nombre}</strong><br />
              {c.municipio}, {c.departamento}<br />
              Nivel: {c.nivel}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}