import React from 'react'
import { BasketIcon } from './components/BasketIcon'
import styles from './styles.module.css'

interface BasketProps {
    onClick: () => void
    count: number
}

export function Basket({ onClick, count }: BasketProps) {
    return (
        <>
            <button className={styles.basket} onClick={onClick}>
                <BasketIcon />
            </button>
            <span className={styles.count}>
                В корзине: {count}
            </span>
        </>
    )
}
