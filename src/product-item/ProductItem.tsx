import React from 'react'
import styles from './styles.module.css'
import { PlusIcon } from '../card/components/PlusIcon'
import { TrashIcon } from '../card/components/TrashIcon'

interface ProductItemProps {
    id: number
    title: string
    count?: number
    price: number
    currency: string
    handlePlusIconClick: () => void
    handleTrashIconClick: () => void
}

export function ProductItem({
    id,
    title,
    count,
    price,
    currency,
    handlePlusIconClick,
    handleTrashIconClick,
}: ProductItemProps) {
    const imageUrl = new URL(`../assets/images/${id}.png`, import.meta.url).href
    const cost = count ? (price * count).toFixed(2) : price
    return (
        <section className={styles.item}>
            <img className={styles.image} src={imageUrl} alt={`${id}`} />
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h5 className={styles.title}>{title}</h5>
                    <div className={styles.container}>
                        <button className={styles.button} onClick={handlePlusIconClick}><PlusIcon /></button>
                        <span className={styles.count}>{count}</span>
                        <button className={styles.button} onClick={handleTrashIconClick}><TrashIcon /></button>
                    </div>
                </div>
                <span className={styles.cost}>
                Общая стоимость: {cost} {currency}
                </span>
            </div>
        </section>
    )
}
