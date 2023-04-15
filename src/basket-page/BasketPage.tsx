import React from 'react'
import { useNavigate } from 'react-router'
import styles from './styles.module.css'
import { ProductWithCount } from '../types/types'
import { ProductItem } from '../product-item/ProductItem'
import { Button } from '../button/Button'
import { request, url } from '../utils/api'
import { Modal } from '../modal/modal'
import { SuccessIcon } from '../modal/components/SuccessIcon'

interface BasketPageProps {
    cards: ProductWithCount[]
    handlePlusIconClick: (id: number) => void
    handleTrashIconClick: (id: number) => void
    hanldeResetBasket: () => void
}

export function BasketPage({
    cards,
    handlePlusIconClick,
    handleTrashIconClick,
    hanldeResetBasket,
}: BasketPageProps) {
    const navigate = useNavigate()
    const summary = cards.reduce((acc, product) => acc + (product.regular_price.value * (product.count || 0)), 0).toFixed(2)
    React.useEffect(() => {
        if (!cards.some((card) => card.count)) {
            navigate('/')
        }
    }, [])
    const [isModal, setIsModal] = React.useState(false)
    const [inputValues, setInputValues] = React.useState({ name: '', phone: '' })
    const currency = cards.every((product) => product.regular_price.currency === cards[0].regular_price.currency)
        ? cards[0].regular_price.currency
        : ''

    const handleBackToMainButtonClick = () => {
        navigate('/')
    }

    const handlePlaceOrderButtonClick = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify({ inputValues, cards }),
        }
        request(url, options).then(() => {
            setIsModal(true)
        }).catch((err) => console.warn(err))
    }

    const handleModalCloseButtonClick = () => {
        setIsModal(false)
        hanldeResetBasket()
        navigate('/')
    }
    return (
        <main className={styles.main}>
            {cards.map((product) => {
                if (product.count) {
                    return (
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            price={product.regular_price.value}
                            currency={product.regular_price.currency}
                            title={product.title}
                            count={product.count}
                            handlePlusIconClick={() => handlePlusIconClick(product.id)}
                            handleTrashIconClick={() => handleTrashIconClick(product.id)}
                        />
                    )
                }
            })}
            <span className={styles.summary}>
            Итого:
                {summary}
                {' '}
                {currency}
            </span>
            <input
                className={styles.input}
                name="name"
                placeholder="Введите имя"
                onChange={(e) => setInputValues({ ...inputValues, name: e.target.value })}
            />
            <input
                className={styles.input}
                name="name"
                placeholder="Введите телефон"
                onChange={(e) => setInputValues({ ...inputValues, phone: e.target.value })}
            />
            <Button text="Вернуться назад" onClick={handleBackToMainButtonClick} />
            <Button text="Оформить заказ" onClick={handlePlaceOrderButtonClick} />
            {isModal && <Modal onClick={handleModalCloseButtonClick} text="Заказ оформлен!" children={<SuccessIcon />} />}
        </main>
    )
}
