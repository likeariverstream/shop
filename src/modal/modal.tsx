import React from 'react'
import styles from './styles.module.css'
import { CloseButton } from './components/CloseButton'

interface ModalProps {
    text?: string
    onClick: () => void
    children?: JSX.Element
}

export function Modal({ text, onClick, children }: ModalProps) {
    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.modal}>
                <button
                    className={styles.button}
                    onClick={onClick}
                >
                    <CloseButton />
                </button>
                {children}
                <span className={styles.text}>
                    {text}
                </span>
            </div>
        </>
    )
}
