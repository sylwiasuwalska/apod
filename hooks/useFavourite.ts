import { useState } from 'react'
import { getDataFromStorage, setDataToStorage } from '../utils/getDataFromStorage'
import { ApodType } from '../components/pictureTile'

export const useFavourite = (date: string) => {
    const favPics = 'favPics'
    const favouritePictures = getDataFromStorage(favPics)

    const [isFavourite, setIsFavourite] = useState<boolean>(
        favouritePictures ? Object.keys(favouritePictures).some((element: string) => element === date) : false
    )

    const toggleFavourite = (item: ApodType) => {
        const favouritePictures = getDataFromStorage(favPics)

        let picturesToSave: { [k: string]: ApodType }
        if (isFavourite) {
            picturesToSave = favouritePictures
            delete picturesToSave[item.date]
        } else {
            picturesToSave = { ...favouritePictures, [item.date]: item }
        }
        setDataToStorage(favPics, picturesToSave)
        setIsFavourite(!isFavourite)
    }

    return { isFavourite, toggleFavourite }
}
