import React from 'react'
import styles from './styles.module.css'

interface BrandItemProps {
    onClick?: () => void
    active?: boolean
    title: string
    id: number
}

export function BrandItem({ onClick, title, active = false }: BrandItemProps) {
    return (
        <div className={styles.item}>
            <button onClick={onClick} className={`${styles.checkbox} ${active && styles.active}`} />
            <span className={styles.title}>{title}</span>
        </div>
    )
}
