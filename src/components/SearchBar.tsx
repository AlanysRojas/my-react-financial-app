import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      className={styles.search__bar}
      placeholder="Search..."
      value={searchTerm}
      onChange={e => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
