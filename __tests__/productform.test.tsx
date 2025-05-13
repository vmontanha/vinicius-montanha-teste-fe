import { render, screen, fireEvent } from '@testing-library/react'
import ProductForm from '../src/components/ProductForm'

describe('ProductForm', () => {
  const mockOnAdd = jest.fn()
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnAdd.mockClear()
    mockOnClose.mockClear()
  })

  it('deve renderizar todos os campos do formulário', () => {
    render(<ProductForm onAdd={mockOnAdd} onClose={mockOnClose} />)

    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/categoria/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/preço/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/url da imagem/i)).toBeInTheDocument()
  })

  it('deve validar campos obrigatórios e não submeter se estiverem vazios', () => {
    render(<ProductForm onAdd={mockOnAdd} onClose={mockOnClose} />)

    fireEvent.click(screen.getByText(/salvar/i))

    expect(mockOnAdd).not.toHaveBeenCalled()
    expect(screen.getByText(/preencha todos os campos/i)).toBeInTheDocument()
  })

  it('deve submeter o formulário com dados válidos', () => {
    render(<ProductForm onAdd={mockOnAdd} onClose={mockOnClose} />)

    fireEvent.change(screen.getByPlaceholderText(/nome/i), {
      target: { value: 'Produto Teste' },
    })
    fireEvent.change(screen.getByPlaceholderText(/categoria/i), {
      target: { value: 'Categoria A' },
    })
    fireEvent.change(screen.getByPlaceholderText(/preço/i), {
      target: { value: '123' },
    })
    fireEvent.change(screen.getByPlaceholderText(/descrição/i), {
      target: { value: 'Descrição teste' },
    })
    fireEvent.change(screen.getByPlaceholderText(/url da imagem/i), {
      target: {
        value: 'https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027.jpg',
      },
    })

    fireEvent.click(screen.getByText(/salvar/i))

    expect(mockOnAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Produto Teste',
        price: 123,
        description: 'Descrição teste',
        category: 'Categoria A',
        image: 'https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027.jpg',
        id: expect.any(Number),
      })
    )

    expect(mockOnClose).toHaveBeenCalled()
  })
})
