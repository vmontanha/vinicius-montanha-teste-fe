'use client'

import { useState } from 'react'
import { Product } from '../types/product'

type ProductFormProps = {
  onAdd: (product: Product) => void
  onClose: () => void
}

export default function ProductForm({ onAdd, onClose }: ProductFormProps) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')

  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !price || !description || !image || !category) {
      setError('Preencha todos os campos.')
      return
    }

    const newProduct: Product = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      description,
      category,
      image,
    }

    onAdd(newProduct)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Novo Produto</h2>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="url"
            placeholder="URL da Imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
