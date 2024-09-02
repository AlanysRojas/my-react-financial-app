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
import Alert from './Alert';

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
  const { id } = useParams<{ id: string }>();
  const [alertBanner, setAlertBanner] = useState({
    show: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
  });

  const handleClose = () => {
    setAlertBanner({
      show: false,
      message: '',
      type: 'info',
    });
  };

  useEffect(() => {
    if (isEdit && id) {
      const loadProduct = async () => {
        try {
          const product = await getProductById(id);
          setProduct(product);
        } catch (error) {
          setAlertBanner({
            show: true,
            message:
              'Error al cargar el producto. Por favor, intenta nuevamente.',
            type: 'error',
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
        setAlertBanner({
          show: true,
          message: 'Producto actualizado con éxito.',
          type: 'success',
        });
      } else {
        await createProduct(product);
        setAlertBanner({
          show: true,
          message: 'Producto creado con éxito.',
          type: 'success',
        });
      }
      cleanForm();
    } catch (error) {
      setAlertBanner({
        show: true,
        message: `Error al ${isEdit ? 'actualizar' : 'crear'} el producto. Por favor, intenta nuevamente.`,
        type: 'error',
      });
    }
  };
  const cleanForm = () => {
    setProduct({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });
    setErrors({});
  };

  const handleReset = () => {
    cleanForm();
    handleClose();
  };

  return (
    <div>
      <Header />
      <div className={styles.form__container}>
        <h2>{isEdit ? 'Editar Producto' : 'Formulario de Registro'}</h2>
        {alertBanner.show && (
          <Alert
            message={alertBanner.message}
            type={alertBanner.type}
            onClose={handleClose}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.form__row}>
            <div className={styles.form__group}>
              <label htmlFor="id">ID</label>
              <input
                type="text"
                id="id"
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
                id="name"
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
                id="description"
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
                id="logo"
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
                id="date_release"
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
                id="date_revision"
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
      </div>
    </div>
  );
};

export default ProductForm;
