import { Product } from '../types/Product';

export const validateProduct = (product: Product) => {
  const errors: { [key: string]: string } = {};

  if (!product.id || product.id.length < 3 || product.id.length > 10) {
    errors.id = 'El ID es requerido y debe tener entre 3 y 10 caracteres.';
  }

  if (!product.name || product.name.length < 5 || product.name.length > 100) {
    errors.name =
      'El nombre es requerido y debe tener entre 5 y 100 caracteres.';
  }

  if (
    !product.description ||
    product.description.length < 10 ||
    product.description.length > 200
  ) {
    errors.description =
      'La descripción es requerida y debe tener entre 10 y 200 caracteres.';
  }

  if (!product.logo) {
    errors.logo = 'El logo es requerido.';
  }

  if (!product.date_release || new Date(product.date_release) < new Date()) {
    errors.date_release =
      'La fecha de liberación es requerida y debe ser igual o mayor a la fecha actual.';
  }

  if (
    !product.date_revision ||
    new Date(product.date_revision) <= new Date(product.date_release)
  ) {
    errors.date_revision =
      'La fecha de revisión es requerida y debe ser al menos un año después de la fecha de liberación.';
  }

  return errors;
};
