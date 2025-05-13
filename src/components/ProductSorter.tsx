'use client'

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

type Props = {
  onSort: (option: SortOption) => void
}

export default function ProductSorter({ onSort }: Props) {
  return (
    <div className="mb-6 flex justify-end">
      <select
        onChange={(e) => onSort(e.target.value as SortOption)}
        className="border px-3 py-2 rounded text-sm"
        defaultValue=""
      >
        <option value="" disabled>Ordenar por</option>
        <option value="name-asc">Nome (A-Z)</option>
        <option value="name-desc">Nome (Z-A)</option>
        <option value="price-asc">Preço (Crescente)</option>
        <option value="price-desc">Preço (Decrescente)</option>
      </select>
    </div>
  )
}
