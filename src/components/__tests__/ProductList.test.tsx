import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductList from '../ProductList';
import { useProducts } from '../../hooks/useProducts';

jest.mock('../../hooks/useProducts', () => ({
  useProducts: jest.fn(),
}));

const productList = [
  {
    id: '001',
    name: 'Test Product 1',
    description: 'This is a test product 1',
    logo: 'test-logo-1.png',
    date_release: '2024-11-01',
    date_revision: '2026-09-10',
  },
  {
    id: '002',
    name: 'Test Product 2',
    description: 'This is a test product 2',
    logo: 'test-logo-2.png',
    date_release: '2024-12-01',
    date_revision: '2027-09-10',
  },
  {
    id: '003',
    name: 'Test Product 3',
    description: 'This is a test product 3',
    logo: 'test-logo-3.png',
    date_release: '2024-12-01',
    date_revision: '2028-02-10',
  },
  {
    id: '004',
    name: 'Test Product 4',
    description: 'This is a test product 4',
    logo: 'test-logo-4.png',
    date_release: '2024-12-01',
    date_revision: '2028-02-10',
  },
  {
    id: '005',
    name: 'Test Product 5',
    description: 'This is a test product 5',
    logo: 'test-logo-5.png',
    date_release: '2024-12-01',
    date_revision: '2028-02-10',
  },
  {
    id: '006',
    name: 'Test Product 6',
    description: 'This is a test product 6',
    logo: 'test-logo-6.png',
    date_release: '2024-12-01',
    date_revision: '2028-02-10',
  },
];
describe('ProductList', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      loading: true,
      error: null,
    });

    render(<ProductList />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Loading products.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      error: 'Error loading products',
    });

    render(<ProductList />, { wrapper: MemoryRouter });

    expect(screen.getByText(/error loading products/i)).toBeInTheDocument();
  });

  it('renders products list', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: productList,
      loading: false,
      error: null,
    });

    render(<ProductList />, { wrapper: MemoryRouter });

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('filters products based on search term', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: productList,
      loading: false,
      error: null,
    });

    render(<ProductList />, { wrapper: MemoryRouter });

    const searchBar = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(searchBar, { target: { value: 'Test Product 2' } });

    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
  });

  it('paginates products', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: productList,
      loading: false,
      error: null,
    });

    render(<ProductList />, { wrapper: MemoryRouter });

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.queryByText('Test Product 6')).not.toBeInTheDocument();
  });
});
