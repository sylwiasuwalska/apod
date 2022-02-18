import React, { ReactChild, useState } from 'react'
import { ApodType } from '../../components/pictureTile'
import { getDataFromStorage, setDataToStorage } from '../../utils/getDataFromStorage'

const FavouritesContext = React.createContext({ favouritePictures: {}, toggleFavourite: (item: ApodType) => {} })

interface FavouriteProviderProps {
    children?: ReactChild | ReactChild[]
}

const FavouritesProvider = ({ children }: FavouriteProviderProps) => {
    const favPics = 'favPics'
    const favouritePicturesFromStorage = getDataFromStorage(favPics)
    const [favouritePictures, setFavouritePictures] = useState(favouritePicturesFromStorage)

    const toggleFavourite = (item: ApodType) => {
        const favouritePictures = getDataFromStorage(favPics)

        let picturesToSave: { [k: string]: ApodType }
        if (Object.keys(favouritePictures).some((element: string) => element === item.date)) {
            picturesToSave = favouritePictures
            delete picturesToSave[item.date]
        } else {
            picturesToSave = { ...favouritePictures, [item.date]: item }
        }
        setFavouritePictures(picturesToSave)
        setDataToStorage(favPics, picturesToSave)
    }

    return (
        <FavouritesContext.Provider value={{ favouritePictures, toggleFavourite }}>
            {children}
        </FavouritesContext.Provider>
    )
}

export { FavouritesContext, FavouritesProvider }
