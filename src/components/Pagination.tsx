'use client'

import React from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const renderPages = () => {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 text-sm rounded transition ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-300'
          }`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-8"
      role="navigation"
      aria-label="Paginação de produtos"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 text-sm rounded disabled:opacity-50"
      >
        Anterior
      </button>

      {renderPages()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 text-sm rounded disabled:opacity-50"
      >
        Próximo
      </button>
    </nav>
  )
}
