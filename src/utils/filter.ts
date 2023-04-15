import { Products } from '../types/types'

export const filterElementsFromArray = (index: number, array: Products, cardLimit = 6) => {
    const arrayToShow = array.slice(index, index + cardLimit)
    index += cardLimit
    if (index >= array.length) {
        index = 0
    }
    return arrayToShow
}
