import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationSelector from '../PaginationSelector';
import { PaginationSelectorProps } from '../../types/Pagination';

describe('PaginationSelector Component', () => {
  const defaultProps: PaginationSelectorProps = {
    itemsPerPage: 10,
    onItemsPerPageChange: jest.fn(),
    totalItems: 50,
  };

  test('renders the total items correctly', () => {
    render(<PaginationSelector {...defaultProps} />);
    const totalItemsText = screen.getByText(/50 Resultados/i);
    expect(totalItemsText).toBeInTheDocument();
  });

  test('renders the select with the correct initial value', () => {
    render(<PaginationSelector {...defaultProps} />);
    const selectElement = screen.getByDisplayValue('10');
    expect(selectElement).toBeInTheDocument();
  });

  test('calls onItemsPerPageChange when a different value is selected', () => {
    render(<PaginationSelector {...defaultProps} />);
    const selectElement = screen.getByDisplayValue('10');

    fireEvent.change(selectElement, { target: { value: '20' } });

    expect(defaultProps.onItemsPerPageChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onItemsPerPageChange).toHaveBeenCalledWith(20);
  });

  test('applies the correct CSS classes', () => {
    render(<PaginationSelector {...defaultProps} />);

    const containerElement = screen.getByText(/50 Resultados/i).closest('div');
    expect(containerElement).toHaveClass('pagination__container');

    const selectContainerElement = screen
      .getByDisplayValue('10')
      .closest('div');
    expect(selectContainerElement).toHaveClass('pagination__select__container');
  });
});
