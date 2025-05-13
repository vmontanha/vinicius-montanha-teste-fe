// src/components/ProductCard.tsx
import { Product } from "@/types/product"

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:scale-[1.02] hover:shadow-lg duration-200">
      <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-black">R$ {product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-400">{product.category}</span>
        </div>
      </div>
    </div>
  )
}
