import React, { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductItem from './ProductItem';
import Header from './Header';
import styles from './ProductList.module.css';
import SearchBar from './SearchBar';
import PaginationSelector from './PaginationSelector';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(5);
  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts?.slice(0, itemsPerPage);
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/products/new');
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.product__list__container}>
      <Header />
      <div className={styles.search__bar__container}>
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <button onClick={handleAddClick} className={styles.agregar__button}>
          Agregar
        </button>
      </div>
      <div className={styles.product__table__container}>
        <table className={styles.product__table}>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nombre del producto</th>
              <th>Descripción</th>
              <th>Fecha de liberación</th>
              <th>Fecha de reestructuración</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts?.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
        <PaginationSelector
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          totalItems={filteredProducts?.length}
        />
      </div>
    </div>
  );
};

export default ProductList;
