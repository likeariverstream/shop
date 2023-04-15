import React from "react";
import styles from './styles.module.css'
import { PlusIcon } from "./components/PlusIcon";

interface CardProps {
    id: number
    title: string
    image?: string
    price: {
        currency: string
        value: number
    }
    onClick: () => void
    count?: number
}

export const Card = ({ id, title, price, onClick, count = 0 }: CardProps) => {
    const { currency, value } = price
    const imageUrl = new URL(`../assets/images/${id}.png`, import.meta.url).href
    return (
        <section className={styles.card}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.container}>
                <span className={styles.count}>
                    {count}
                </span>
            </div>
            <img className={styles.image} src={imageUrl} />
            <span className={styles.price}>Цена: {value} {currency}</span>
            <span className={styles.add}>
                <button
                    className={styles.button}
                    onClick={onClick}>
                    <PlusIcon />
                </button>
                Добавить в корзину</span>
        </section>
    )
}