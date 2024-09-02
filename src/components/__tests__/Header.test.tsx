import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header Component', () => {
  test('renders the header with logo and title', () => {
    render(<Header />);

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    const title = screen.getByText('BANCO');
    expect(title).toBeInTheDocument();
  });

  test('applies the correct CSS classes', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');

    const logo = screen.getByAltText('Logo');
    expect(logo).toHaveClass('header__logo');
  });
});
