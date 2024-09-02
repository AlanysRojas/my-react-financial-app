import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import ProductItem from '../ProductItem';
import { ProductItemProps } from '../../types/Product';
import ProductForm from '../ProductForm';
import ProductList from '../ProductList';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const product: ProductItemProps['product'] = {
  id: '123123',
  name: 'Test Product',
  logo: 'logo.png',
  description: 'This is a test product',
  date_release: '2024-10-10',
  date_revision: '2026-06-01',
};

describe('ProductItem Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders product details correctly', () => {
    render(<ProductItem product={product} />, { wrapper: MemoryRouter });
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('09/10/2024')).toBeInTheDocument();
    expect(screen.getByText('31/05/2026')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  it('navigates to the edit page when the Edit button is clicked', () => {
    render(<ProductItem product={product} />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText('⋮'));
    fireEvent.click(screen.getByText('Editar'));

    expect(mockNavigate).toHaveBeenCalledWith('/products/edit/123123');
  });

  it('toggles the dropdown menu visibility', () => {
    render(<ProductItem product={product} />, { wrapper: MemoryRouter });

    const dropdownButton = screen.getByText('⋮');
    fireEvent.click(dropdownButton);

    expect(screen.getByText('Editar')).toBeInTheDocument();

    fireEvent.click(dropdownButton);
    expect(screen.queryByText('Editar')).not.toBeInTheDocument();
  });
});
