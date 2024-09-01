import React from "react";
import { useProducts } from "../hooks/useProducts";
import ProductItem from "./ProductItem";
import Header from "./Header";
import styles from "./ProductList.module.css";

const ProductList: React.FC = () => {
    const { products, loading, error } = useProducts();
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [itemsPerPage, setItemsPerPage] = React.useState<number>(5);
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const paginatedProducts = filteredProducts.slice(0, itemsPerPage);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.product__list__container}>
            <Header />
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
                    {paginatedProducts.map((product) => (
                        <ProductItem key={product.id} product={product}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
