import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import products from '../assets/products.json'
import brands from '../assets/brands.json'
import { Card } from '../card/Card'
import { Button } from '../button/Button'
import { filterElementsFromArray } from '../utils/filter'
import { BrandItem } from '../brand-item/BrandItem'
import { Active, ProductWithCount } from '../types/types'
import { Basket } from '../basket/Basket'
import { BasketPage } from '../basket-page/BasketPage'

export const Main = () => {
    const cardLimit = 6
    const navigate = useNavigate()
    const location = useLocation()
    React.useEffect(() => {
        if (location.pathname === '/') {
            setIsMain(true)
        }
        if (location.pathname === '/basket') {
            setIsMain(false)
        }
    }, [location])

    const [count, setCount] = React.useState(cardLimit)
    const [isMain, setIsMain] = React.useState(true)
    const [cards, setCards] = React.useState<ProductWithCount[]>(products)
    const [filteredCards, setFilteredCards] = React.useState<ProductWithCount[]>(cards)
    const [actives, setActives] = React.useState<Active[]>(brands)
    const [hasActiveCheckbox, setHasActiveCheckbox] = React.useState(false)
    const [paginationButtonVisible, setPaginationButtonVisible] = React.useState(true)
    const [, setBasketCount] = React.useState(0)
    React.useEffect(() => {
        const arr = filterElementsFromArray(0, filteredCards, cardLimit)
        setFilteredCards(arr)
        setCount(cardLimit)
    }, [])
    const handlePaginateButtonClick = () => {

        if (count < products.length) {  
            const arr = filterElementsFromArray(count, cards, cardLimit)
            setFilteredCards(arr)
            setCount(count + cardLimit)
        }
        if (count > products.length) {
            setCount(0)
            const arr = filterElementsFromArray(0, cards, cardLimit)
            setFilteredCards(arr)
            setCount(cardLimit)
        }
    }

    const handleBrandClick = (id: number) => {
        const updatedActives = actives.map((brand) => {
            if (brand.id === id) {
                return { ...brand, active: !brand.active }
            }
            return brand
        })
        setActives(updatedActives)
    }
    React.useEffect(() => {
        const hasActive = actives.some((item) => item.active)
        setHasActiveCheckbox(hasActive)
    }, [actives])

    const isActiveCheckBox = (id: number) => actives.find((item) => item.id === id)?.active

    const handleFilterButtonClick = () => {
        if (!actives.some((item) => item.active)) {
            setActives(brands)
            const arr = filterElementsFromArray(0, filteredCards)
            setCards(arr)
            setFilteredCards(arr)
        }
        if (actives.some((item) => item.active)) {
            const productsWithActiveBrands = filteredCards.filter((product) => {
                const activeBrand = actives.find((active) => active.id === product.brand)
                return activeBrand && activeBrand.active
            })
            setCards(productsWithActiveBrands)
            setFilteredCards(productsWithActiveBrands)
        }
        setPaginationButtonVisible(false)
    }
    const hanldeResetBasket = () => {
        setCards(products)
        setFilteredCards(products)
    }
    const handleResetFilterButtonClick = () => {
        const arr = filterElementsFromArray(0, products)
        setCards(products)
        setFilteredCards(arr)
        setActives(brands)
        setPaginationButtonVisible(true)
    }
    const handleAddProduct = (id: number) => {
        const updatedCards = cards.map((product) => {
            if (product.id === id) {
                return { ...product, count: product.count ? product.count + 1 : 1 }
            }
            return product
        })
        const updatedFilteredCards = filteredCards.map((product) => {
            if (product.id === id) {
                return { ...product, count: product.count ? product.count + 1 : 1 }
            }
            return product
        })
        setCards(updatedCards)
        setFilteredCards(updatedFilteredCards)
    }

    const handleDeleteProduct = (id: number) => {
        const updatedCards = cards.map((product) => {
            if (product.id === id) {
                return { ...product, count: product.count ? product.count - 1 : 0 }
            }
            return product
        })
        const updatedFilteredCards = filteredCards.map((product) => {
            if (product.id === id) {
                return { ...product, count: product.count ? product.count - 1 : 0 }
            }
            return product
        })
        setCards(updatedCards)
        setFilteredCards(updatedFilteredCards)
    }

    const getBasketCount = (products: ProductWithCount[]): number => products.reduce((acc, product) => acc + (product.count || 0), 0)

    React.useEffect(() => {
        setBasketCount(getBasketCount(cards))
    }, [cards])

    const handleBasketClick = () => {
        setIsMain(false)
        navigate('/basket')
    }

    return (
        isMain ? (
            <main className={styles.main}>
                <section className={styles.brands}>
                    {brands.map((brand) => (
                        <BrandItem
                            key={brand.id}
                            onClick={() => handleBrandClick(brand.id)}
                            title={brand.title}
                            id={brand.id}
                            active={isActiveCheckBox(brand.id)}
                        />
                    ))}
                    <Button text="Применить" onClick={handleFilterButtonClick} disabled={!hasActiveCheckbox} />
                    {hasActiveCheckbox && <Button text="Сбросить" onClick={handleResetFilterButtonClick} />}
                    {paginationButtonVisible && <Button text="Показать еще" onClick={handlePaginateButtonClick} />}
                    <Basket onClick={handleBasketClick} count={getBasketCount(cards)} />
                </section>
                <section className={styles.products}>
                    {filteredCards.map((product, index) => {
                        return <Card
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.regular_price}
                            handlePlusIconClick={() => handleAddProduct(product.id)}
                            handleTrashIconClick={() => handleDeleteProduct(product.id)}
                            count={product.count}
                        />
                    })}
                </section>
            </main>
        ) : (
            <BasketPage
                cards={cards}
                handlePlusIconClick={handleAddProduct}
                handleTrashIconClick={handleDeleteProduct}
                hanldeResetBasket={hanldeResetBasket}
            />
        )
    )
}
