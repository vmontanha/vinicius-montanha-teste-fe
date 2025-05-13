import { render, waitFor } from '@testing-library/react'
import HomePage from '../src/app/page'
import { api } from '../src/lib/api'
import { Product } from '../src/types/product'

jest.mock('../src/lib/api')
const mockedApi = api as jest.Mocked<typeof api>

describe('HomePage Snapshot', () => {
  it('should match the DOM snapshot', async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Produto Teste',
        price: 100,
        description: 'Descrição de teste',
        category: 'Categoria',
        image: 'https://via.placeholder.com/150',
      },
    ]

    mockedApi.get.mockResolvedValueOnce({ data: mockProducts })

    const { container } = render(<HomePage />)

    await waitFor(() =>
      expect(container.querySelector('h2')?.textContent).toMatch(/Produto Teste/)
    )

    expect(container).toMatchSnapshot()
  })
})
