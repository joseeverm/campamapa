import { Link, useLocation } from 'react-router-dom'
import { MapIcon, UsersIcon, PlusCircleIcon, MapPinIcon } from '@heroicons/react/24/solid'
import {
  MapIcon as MapIconOutline,
  UsersIcon as UsersIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
} from '@heroicons/react/24/outline'

export default function Navbar() {
  const { pathname } = useLocation()

  const links = [
    { to: '/campamapa', text: 'Mapa', Icon: MapIconOutline, IconActive: MapIcon },
    { to: '/campistas', text: 'Campistas', Icon: UsersIconOutline, IconActive: UsersIcon },
    { to: '/agregar', text: 'Agregar', Icon: PlusCircleIconOutline, IconActive: PlusCircleIcon },
  ]

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1100] flex h-14 items-center gap-2 bg-forest-700 px-4 shadow-soft">
        <MapPinIcon className="h-6 w-6 text-sun-300" />
        <span className="text-lg font-extrabold tracking-tight text-white">CampaMapa</span>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-[1100] flex h-[68px] items-center justify-around gap-1 border-t border-forest-100 bg-white/95 px-2 py-2 shadow-[0_-2px_16px_rgba(27,67,50,0.12)] backdrop-blur">
        {links.map(({ to, text, Icon, IconActive }) => {
          const active = pathname === to
          const ActiveIcon = active ? IconActive : Icon
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-3 py-1.5 text-xs font-medium transition-colors ${
                active ? 'bg-forest-600 text-white shadow-soft' : 'text-forest-500 hover:bg-forest-50'
              }`}
            >
              <ActiveIcon className="h-6 w-6" />
              {text}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
