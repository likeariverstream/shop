import React from "react";
import styles from './styles.module.css'

interface CardProps {
    id: number
    title: string
    image?: string
}

export const Card = ({id, title}: CardProps) => {
    const imageUrl = new URL(`../assets/images/${id}.png`, import.meta.url).href
    return (
        <section className={styles.card}>
            <h4 className={styles.title}>{title}</h4>
            <img className={styles.image} src={imageUrl} />
        </section>
    )
}