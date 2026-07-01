import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EyeIcon, TrashIcon, UserGroupIcon, PlusIcon } from '@heroicons/react/24/solid'
import { getCampistas, deleteCampista } from '../services/storage'
import { estiloNivel, inicial } from '../utils/niveles'

export default function Campistas() {
    const [campistas, setCampistas] = useState([])

    useEffect(() => {
        setCampistas(getCampistas())
    }, [])

    function handleDelete(id) {
        if (!confirm('¿Eliminar este campista?')) return
        deleteCampista(id)
        setCampistas(getCampistas())
    }

    if (campistas.length === 0) {
        return (
            <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest-100">
                    <UserGroupIcon className="h-10 w-10 text-forest-500" />
                </div>
                <p className="text-forest-600">No hay campistas guardados aún.</p>
                <Link
                    to="/agregar"
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-forest-600 px-5 py-2.5 font-semibold text-white shadow-soft transition-colors hover:bg-forest-700"
                >
                    <PlusIcon className="h-5 w-5" />
                    Agregar el primero
                </Link>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-xl px-4 py-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-forest-800">
                <UserGroupIcon className="h-6 w-6 text-forest-600" />
                Campistas ({campistas.length})
            </h2>
            <div className="flex flex-col gap-3">
                {campistas.map(c => (
                    <div
                        key={c.id}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-soft"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${estiloNivel(c.nivel).solid}`}
                            >
                                {inicial(c.nombre)}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate font-semibold text-forest-900">{c.nombre}</p>
                                <p className="truncate text-sm text-forest-500">
                                    {c.municipio}, {c.departamento}
                                </p>
                                <span
                                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${estiloNivel(c.nivel).badge}`}
                                >
                                    {c.nivel}
                                </span>
                            </div>
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <Link
                                to={`/campista/${c.id}`}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-600 text-white transition-colors hover:bg-forest-700"
                                aria-label="Ver campista"
                            >
                                <EyeIcon className="h-5 w-5" />
                            </Link>
                            <button
                                onClick={() => handleDelete(c.id)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white transition-colors hover:bg-rose-600"
                                aria-label="Eliminar campista"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
