import { ApodType } from '../components/pictureTile'

export const getDataFromStorage = (key: string): { [k: string]: ApodType } => {
    let dataFromStorage
    if (typeof window !== 'undefined') {
        dataFromStorage = localStorage.getItem(key)
    }
    return dataFromStorage ? JSON.parse(dataFromStorage) : []
}

export const setDataToStorage = (key: string, value: { [k: string]: ApodType }): void => {
    localStorage.setItem(key, JSON.stringify(value))
}
