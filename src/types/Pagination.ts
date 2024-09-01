export interface PaginationSelectorProps {
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
  totalItems: number;
}
