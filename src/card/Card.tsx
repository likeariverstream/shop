import React from 'react'
import styles from './styles.module.css'
import { PlusIcon } from './components/PlusIcon'
import { TrashIcon } from './components/TrashIcon'

interface CardProps {
    id: number
    title: string
    image?: string
    price: {
        currency: string
        value: number
    }
    handlePlusIconClick: () => void
    handleTrashIconClick: () => void
    count?: number
}

export function Card({
    id, title, price, handlePlusIconClick, handleTrashIconClick, count,
}: CardProps) {
    const { currency, value } = price
    const imageUrl = new URL(`../assets/images/${id}.png`, import.meta.url).href
    return (
        <section className={styles.card}>
            <h4 className={styles.title}>{title}</h4>
            {!!count && count > 0 && (
                <div className={styles.container}>
                    <span className={styles.count}>
                        {count}
                    </span>
                </div>
            )}
            <img className={styles.image} src={imageUrl} alt={`${id}`} />
            <span className={styles.price}>
            Цена:{value}
                {' '}
                {currency}
            </span>
            <span className={styles.add}>
                <button
                    className={styles.button}
                    onClick={handlePlusIconClick}
                >
                    <PlusIcon />
                </button>
            Добавить в корзину
            </span>
            {!!count && count > 0 && (
                <span className={styles.add}>
                    <button
                        className={styles.button}
                        onClick={handleTrashIconClick}
                    >
                        <TrashIcon />
                    </button>
              Удалить из корзины
                </span>
            )}
        </section>
    )
}
