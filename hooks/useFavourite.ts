import { useState, useContext, useEffect } from 'react'
import { getDataFromStorage, setDataToStorage } from '../utils/getDataFromStorage'
import { ApodType } from '../components/pictureTile'
import { FavouritesContext } from '../contexts/favourites/favouritesContext'

export const useFavourite = (date: string) => {
    const { favouritePictures, toggleFavourite } = useContext(FavouritesContext)

    const [isFavourite, setIsFavourite] = useState<boolean>(
        favouritePictures ? Object.keys(favouritePictures).some((element: string) => element === date) : false
    )

    useEffect(() => {
        setIsFavourite(Object.keys(favouritePictures).some((element: string) => element === date))
    }, [favouritePictures, date])

    return { isFavourite, toggleFavourite }
}
