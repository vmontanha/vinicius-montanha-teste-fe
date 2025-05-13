import { render, screen, fireEvent } from '@testing-library/react'
import ProductSorter from '../src/components/ProductSorter'

describe('ProductSorter', () => {
  const mockOnSort = jest.fn()

  beforeEach(() => {
    mockOnSort.mockClear()
  })

  it('deve renderizar o select com todas as opções', () => {
    render(<ProductSorter onSort={mockOnSort} />)

    const select = screen.getByRole('combobox')

    expect(select).toBeInTheDocument()
    expect(screen.getByText('Nome (A-Z)')).toBeInTheDocument()
    expect(screen.getByText('Nome (Z-A)')).toBeInTheDocument()
    expect(screen.getByText('Preço (Crescente)')).toBeInTheDocument()
    expect(screen.getByText('Preço (Decrescente)')).toBeInTheDocument()
  })

  it('deve chamar onSort com o valor correto ao alterar a seleção', () => {
    render(<ProductSorter onSort={mockOnSort} />)

    const select = screen.getByRole('combobox')

    fireEvent.change(select, { target: { value: 'name-asc' } })
    expect(mockOnSort).toHaveBeenCalledWith('name-asc')

    fireEvent.change(select, { target: { value: 'price-desc' } })
    expect(mockOnSort).toHaveBeenCalledWith('price-desc')
  })
})
