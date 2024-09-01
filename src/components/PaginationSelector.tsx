import React from 'react';
import styles from './PaginationSelector.module.css';
import { PaginationSelectorProps } from '../types/Pagination';

const PaginationSelector: React.FC<PaginationSelectorProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}) => {
  return (
    <div className={styles.pagination__container}>
      <p className={styles.pagination__total}>{totalItems} Resultados</p>
      <div className={styles.pagination__select__container}>
        <select
          className={styles.pagination__select}
          value={itemsPerPage}
          onChange={e => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationSelector;
