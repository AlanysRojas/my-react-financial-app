import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  MemoryRouter,
} from 'react-router-dom';
import ProductForm from '../ProductForm';
import {
  createProduct,
  getProductById,
  updateProduct,
} from '../../services/productService';
import ProductItem from '../ProductItem';

jest.mock('../../services/productService');

describe('ProductForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const fakeProduct = {
    id: '112233',
    name: 'Test Product',
    description: 'This is a test product',
    logo: 'test-logo.png',
    date_release: '2024-10-01',
    date_revision: '2026-10-10',
  };
  beforeEach(() => {
    (getProductById as jest.Mock).mockResolvedValue(fakeProduct);
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ProductForm isEdit={false} />
      </BrowserRouter>
    );
  };
  const renderEditComponent = (productId: string) => {
    return render(
      <Router initialEntries={[`/products/edit/${productId}`]}>
        <Routes>
          <Route
            path="products/edit/:id"
            element={<ProductForm isEdit={true} />}
          />
        </Routes>
      </Router>
    );
  };

  test('renders the form with initial empty fields', () => {
    render(<ProductForm isEdit={false} />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText(/Nombre/i)).toHaveValue('');
    expect(screen.getByLabelText(/Descripción/i)).toHaveValue('');
    expect(screen.getByLabelText(/Logo/i)).toHaveValue('');
    expect(screen.getByLabelText(/Fecha Liberación/i)).toHaveValue('');
    expect(screen.getByLabelText(/Fecha Revisión/i)).toHaveValue('');
  });

  test('loads product data when in edit mode', async () => {
    renderEditComponent(fakeProduct.id);

    await waitFor(() => {
      expect(screen.getByLabelText(/Nombre/i)).toHaveValue(fakeProduct.name);
      expect(screen.getByLabelText(/Descripción/i)).toHaveValue(
        fakeProduct.description
      );
      expect(screen.getByLabelText(/Logo/i)).toHaveValue(fakeProduct.logo);
      expect(screen.getByLabelText(/Fecha Liberación/i)).toHaveValue(
        fakeProduct.date_release
      );
      expect(screen.getByLabelText(/Fecha Revisión/i)).toHaveValue(
        fakeProduct.date_revision
      );
    });
  });

  test('shows validation errors on submit with invalid data', async () => {
    render(<ProductForm isEdit={false} />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          /El ID es requerido y debe tener entre 3 y 10 caracteres./i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /El nombre es requerido y debe tener entre 5 y 100 caracteres./i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /La descripción es requerida y debe tener entre 10 y 200 caracteres./i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/El logo es requerido./i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /La fecha de liberación es requerida y debe ser igual o mayor a la fecha actual./i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /La fecha de revisión es requerida y debe ser al menos un año después de la fecha de liberación./i
        )
      ).toBeInTheDocument();
    });
  });

  test('submits form successfully in create mode', async () => {
    (createProduct as jest.Mock).mockResolvedValue({});
    render(<ProductForm isEdit={false} />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByLabelText(/ID/i), {
      target: { value: fakeProduct.id },
    });
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: fakeProduct.name },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: fakeProduct.description },
    });
    fireEvent.change(screen.getByLabelText(/Logo/i), {
      target: { value: fakeProduct.logo },
    });
    fireEvent.change(screen.getByLabelText(/Fecha Liberación/i), {
      target: { value: fakeProduct.date_release },
    });
    fireEvent.change(screen.getByLabelText(/Fecha Revisión/i), {
      target: { value: fakeProduct.date_revision },
    });

    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Producto creado con éxito./i)
      ).toBeInTheDocument();
    });
    expect(createProduct).toHaveBeenCalledWith({
      id: fakeProduct.id,
      name: fakeProduct.name,
      description: fakeProduct.description,
      logo: fakeProduct.logo,
      date_release: fakeProduct.date_release,
      date_revision: fakeProduct.date_revision,
    });
  });

  test('submits form successfully in edit mode', async () => {
    (updateProduct as jest.Mock).mockResolvedValue({});
    const updatedProductData = {
      name: 'Updated Product',
      description: 'Updated Product',
      logo: 'logo.png',
      date_release: '2024-10-01',
      date_revision: '2027-02-01',
    };
    renderEditComponent(fakeProduct.id);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/ID/i), {
        target: { value: fakeProduct.id },
      });
      fireEvent.change(screen.getByLabelText(/Nombre/i), {
        target: { value: updatedProductData.name },
      });
      fireEvent.change(screen.getByLabelText(/Descripción/i), {
        target: { value: updatedProductData.description },
      });
      fireEvent.change(screen.getByLabelText(/Logo/i), {
        target: { value: updatedProductData.logo },
      });
      fireEvent.change(screen.getByLabelText(/Fecha Liberación/i), {
        target: { value: updatedProductData.date_release },
      });
      fireEvent.change(screen.getByLabelText(/Fecha Revisión/i), {
        target: { value: updatedProductData.date_revision },
      });
    });

    fireEvent.click(screen.getByRole('button', { name: /Actualizar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Producto actualizado con éxito./i)
      ).toBeInTheDocument();
    });
    expect(updateProduct).toHaveBeenCalledWith({
      id: fakeProduct.id,
      ...updatedProductData,
    });
  });

  test('shows error message when API call fails', async () => {
    (createProduct as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<ProductForm isEdit={false} />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByLabelText(/ID/i), {
      target: { value: fakeProduct.id },
    });
    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: fakeProduct.name },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: fakeProduct.description },
    });
    fireEvent.change(screen.getByLabelText(/Logo/i), {
      target: { value: fakeProduct.logo },
    });
    fireEvent.change(screen.getByLabelText(/Fecha Liberación/i), {
      target: { value: fakeProduct.date_release },
    });
    fireEvent.change(screen.getByLabelText(/Fecha Revisión/i), {
      target: { value: fakeProduct.date_revision },
    });

    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          /Error al crear el producto. Por favor, intenta nuevamente./i
        )
      ).toBeInTheDocument();
    });
  });
});
