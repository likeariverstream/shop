import React from "react";
import styles from './styles.module.css'
import products from '../assets/products.json'
import { Card } from '../card/Card';

export const Main = () => {
    console.log(products)
    return (
        <main className={styles.main}>
            {products.map((product) => {
                return <Card key={product.id} id={product.id} title={product.title} />
            })}
        </main>
    )
}