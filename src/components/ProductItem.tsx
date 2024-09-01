import React from "react";
import styles from "./ProductItem.module.css";
import { ProductItemProps } from "../types/Product";

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
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
                <p>{product.date_release}</p>
            </td>
            <td data-label="Fecha de reestructuración">
                <p>{product.date_revision}</p>
            </td>
        </tr>
    );
};

export default ProductItem;
