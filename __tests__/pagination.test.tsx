import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../src/components/Pagination'

describe('Pagination', () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it('não deve renderizar nada se totalPages for 1 ou menor', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('deve renderizar os botões de página corretamente', () => {
    render(<Pagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />)

    expect(screen.getByText('Anterior')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Próximo')).toBeInTheDocument()
  })

  it('deve chamar onPageChange ao clicar em número de página', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />)

    fireEvent.click(screen.getByText('2'))
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('deve chamar onPageChange ao clicar em Próximo e Anterior', () => {
    render(<Pagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />)

    fireEvent.click(screen.getByText('Anterior'))
    expect(mockOnPageChange).toHaveBeenCalledWith(1)

    fireEvent.click(screen.getByText('Próximo'))
    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('deve desabilitar botão Anterior se currentPage === 1', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />)

    expect(screen.getByText('Anterior')).toBeDisabled()
  })

  it('deve desabilitar botão Próximo se currentPage === totalPages', () => {
    render(<Pagination currentPage={3} totalPages={3} onPageChange={mockOnPageChange} />)

    expect(screen.getByText('Próximo')).toBeDisabled()
  })
})
