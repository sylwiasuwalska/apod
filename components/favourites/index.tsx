import React, { useContext } from 'react'
import Pictures from '../pictures'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box } from '@mui/system'
import { FavouritesContext } from '../../contexts/favourites/favouritesContext'

function Favourites() {
    const { favouritePictures } = useContext(FavouritesContext)

    if (Object.keys(favouritePictures).length) {
        return <Pictures apods={Object.values(favouritePictures)} />
    }
    return (
        <Box sx={{ height: '800px' }}>
            <p>
                Add your favourites pictures using heart icons <FavoriteBorderIcon fontSize={'small'} />
            </p>
            <FavoriteBorderIcon fontSize={'small'} />
            <FavoriteBorderIcon fontSize={'small'} />
        </Box>
    )
}

export default Favourites
