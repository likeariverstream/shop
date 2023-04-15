import React from "react";
import styles from './styles.module.css'

interface ButtonProps {
    onClick: () => void
    text: string
    children?: JSX.Element
    disabled?: boolean
}

export const Button = ({ onClick, text, children, disabled = false }: ButtonProps) => {

    return (
        <button className={styles.button} onClick={onClick} disabled={disabled} >{children}{text}</button>
    )
}
