import React, { useState } from 'react';
import styles from './ProductItem.module.css';
import { ProductItemProps } from '../types/Product';
import { useNavigate } from 'react-router-dom';

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleEditClick = () => {
    navigate(`/products/edit/${product.id}`);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <tr className={styles.product__item}>
      <td data-label="Logo">
        <img src={product.logo} alt={product.name} />
      </td>
      <td data-label="Nombre del producto">
        <p>{product.name}</p>
      </td>
      <td data-label="Descripción">
        <p>{product.description}</p>
      </td>
      <td data-label="Fecha de liberación">
        <p>{formatDate(product.date_release)}</p>
      </td>
      <td data-label="Fecha de reestructuración">
        <p>{formatDate(product.date_revision)}</p>
      </td>
      <td data-label="Fecha de reestructuración">
        <div className={styles.actions}>
          <button onClick={toggleDropdown} className={styles.actions__button}>
            <span className={styles.actions__icon}>⋮</span>
          </button>
          {dropdownOpen && (
            <div className={styles.dropdown}>
              <button
                onClick={handleEditClick}
                className={styles.dropdown__item}
              >
                Editar
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ProductItem;
