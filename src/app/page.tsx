'use client'

import { useEffect, useState } from 'react'
import { Product } from '../types/product'
import { api } from '../lib/api'

import ProductForm from '../components/ProductForm'
import ProductFilters from '../components/ProductFilters'
import ProductSorter from '../components/ProductSorter'
import Pagination from '../components/Pagination'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [sortOption, setSortOption] = useState<'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | ''>('')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get<Product[]>('/products')
      setProducts(response.data)
      setFilteredProducts(response.data)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredProducts])

  const handleFilter = ({
    search,
    minPrice,
    maxPrice,
  }: {
    search: string
    minPrice: number | null
    maxPrice: number | null
  }) => {
    const filtered = products.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(search.toLowerCase())
      const matchMin = minPrice !== null ? p.price >= minPrice : true
      const matchMax = maxPrice !== null ? p.price <= maxPrice : true
      return matchTitle && matchMin && matchMax
    })

    setFilteredProducts(filtered)
  }

  const handleAddProduct = (product: Product) => {
    const updated = [product, ...products]
    setProducts(updated)
    setFilteredProducts(updated)
    setCurrentPage(1)
  }

  const handleSort = (option: typeof sortOption) => {
    setSortOption(option)

    const sorted = [...filteredProducts].sort((a, b) => {
      if (option === 'name-asc') return a.title.localeCompare(b.title)
      if (option === 'name-desc') return b.title.localeCompare(a.title)
      if (option === 'price-asc') return a.price - b.price
      if (option === 'price-desc') return b.price - a.price
      return 0
    })

    setFilteredProducts(sorted)
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <main className="px-4 py-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciador de Produtos</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Novo Produto
        </button>
      </header>

      {showForm && (
        <ProductForm
          onAdd={handleAddProduct}
          onClose={() => setShowForm(false)}
        />
      )}

      <ProductFilters onFilter={handleFilter} />
      <ProductSorter onSort={handleSort} />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Nenhum produto encontrado.
          </div>
        ) : (
          paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg p-4 border border-gray-100"
            >
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-sm mt-2">{product.description}</p>
              <p className="text-md font-bold mt-2 text-blue-600">
                R$ {product.price.toFixed(2)}
              </p>
              <img
                src={product.image}
                alt={product.title}
                className="mt-2 h-32 w-100 object-contain rounded"
              />
            </div>
          ))
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  )
}
