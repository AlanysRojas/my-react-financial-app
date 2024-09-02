import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { validateProduct } from '../utils/validationUtils';
import {
  createProduct,
  updateProduct,
  getProductById,
} from '../services/productService';
import Header from './Header';
import styles from './ProductForm.module.css';
import { useParams } from 'react-router-dom';

const ProductForm: React.FC<{ isEdit?: boolean }> = ({ isEdit = false }) => {
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (isEdit && id) {
      const loadProduct = async () => {
        try {
          const product = await getProductById(id);
          setProduct(product);
        } catch (error) {
          setErrors({
            apiError:
              'Error al cargar el producto. Por favor, intenta nuevamente.',
          });
        }
      };
      loadProduct();
    }
  }, [isEdit, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateProduct(product);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEdit) {
        await updateProduct(product);
        setSuccessMessage('Producto actualizado con éxito.');
      } else {
        await createProduct(product);
        setSuccessMessage('Producto creado con éxito.');
      }
      handleReset();
    } catch (error) {
      setErrors({
        apiError: `Error al ${isEdit ? 'actualizar' : 'crear'} el producto. Por favor, intenta nuevamente.`,
      });
    }
  };

  const handleReset = () => {
    setProduct({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div>
      <Header />
      <div className={styles.form__container}>
        <h2>{isEdit ? 'Editar Producto' : 'Formulario de Registro'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form__row}>
            <div className={styles.form__group}>
              <label htmlFor="id">ID</label>
              <input
                type="text"
                name="id"
                value={product.id}
                onChange={handleChange}
                className={errors.id ? styles.error : ''}
                readOnly={isEdit}
              />
              {errors.id && (
                <span className={styles.error__message}>{errors.id}</span>
              )}
            </div>
            <div className={styles.form__group}>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className={errors.name ? styles.error : ''}
              />
              {errors.name && (
                <span className={styles.error__message}>{errors.name}</span>
              )}
            </div>
          </div>
          <div className={styles.form__row}>
            <div className={styles.form__group}>
              <label htmlFor="description">Descripción</label>
              <input
                name="description"
                value={product.description}
                onChange={handleChange}
                className={errors.description ? styles.error : ''}
              />
              {errors.description && (
                <span className={styles.error__message}>
                  {errors.description}
                </span>
              )}
            </div>
            <div className={styles.form__group}>
              <label htmlFor="logo">Logo</label>
              <input
                type="text"
                name="logo"
                value={product.logo}
                onChange={handleChange}
                className={errors.logo ? styles.error : ''}
              />
              {errors.logo && (
                <span className={styles.error__message}>{errors.logo}</span>
              )}
            </div>
          </div>
          <div className={styles.form__row}>
            <div className={styles.form__group}>
              <label htmlFor="date_release">Fecha Liberación</label>
              <input
                type="date"
                name="date_release"
                value={product.date_release}
                onChange={handleChange}
                className={errors.date_release ? styles.error : ''}
              />
              {errors.date_release && (
                <span className={styles.error__message}>
                  {errors.date_release}
                </span>
              )}
            </div>
            <div className={styles.form__group}>
              <label htmlFor="date_revision">Fecha Revisión</label>
              <input
                type="date"
                name="date_revision"
                value={product.date_revision}
                onChange={handleChange}
                className={errors.date_revision ? styles.error : ''}
              />
              {errors.date_revision && (
                <span className={styles.error__message}>
                  {errors.date_revision}
                </span>
              )}
            </div>
          </div>
          {errors.apiError && (
            <p className={styles.api__error__message}>{errors.apiError}</p>
          )}
          <div className={styles.button__group}>
            <button
              type="button"
              onClick={handleReset}
              className={styles.reset__button}
            >
              Reiniciar
            </button>
            <button type="submit" className={styles.submit__button}>
              {isEdit ? 'Actualizar' : 'Enviar'}
            </button>
          </div>
        </form>
        {successMessage && (
          <p className={styles.success__message}>{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ProductForm;
