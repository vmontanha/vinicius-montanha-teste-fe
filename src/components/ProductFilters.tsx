'use client'

import { useState } from 'react'

type Props = {
  onFilter: (filters: {
    search: string
    minPrice: number | null
    maxPrice: number | null
  }) => void
}

export default function ProductFilters({ onFilter }: Props) {
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleFilter = () => {
    onFilter({
      search,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
    })
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      <input
        type="text"
        placeholder="Buscar por nome"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <input
        type="number"
        placeholder="Preço mínimo"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <input
        type="number"
        placeholder="Preço máximo"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
      <button
        onClick={handleFilter}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Filtrar
      </button>
    </div>
  )
}
