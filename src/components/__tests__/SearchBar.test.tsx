import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  const defaultProps = {
    searchTerm: '',
    onSearch: jest.fn(),
  };

  test('renders input field', () => {
    render(<SearchBar {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText(
      /search.../i
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onSearch when input changes', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar searchTerm="" onSearch={onSearchMock} />);
    const inputElement = screen.getByPlaceholderText(
      /search.../i
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'test search' } });
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('test search');
  });

  test('calls onSearch when input changes', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar searchTerm="" onSearch={onSearchMock} />);
    const inputElement = screen.getByPlaceholderText(
      /search.../i
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'test search' } });
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('test search');
  });

  test('input field value reflects searchTerm prop', () => {
    const onSearchMock = jest.fn();
    const { rerender } = render(
      <SearchBar searchTerm="initial" onSearch={onSearchMock} />
    );
    const inputElement = screen.getByPlaceholderText(
      /search.../i
    ) as HTMLInputElement;

    expect(inputElement.value).toBe('initial');

    rerender(<SearchBar searchTerm="updated search" onSearch={onSearchMock} />);
    expect(inputElement.value).toBe('updated search');
  });
});
