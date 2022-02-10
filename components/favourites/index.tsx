import React, { useState } from 'react'
import { getDataFromStorage } from '../../utils/getDataFromStorage'
import Pictures from '../pictures'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box } from '@mui/system'

function Favourites() {
    const favouritePictures = getDataFromStorage('favPics')
    const [favPics] = useState(Object.values(favouritePictures))

    if (Object.keys(favPics).length) {
        return <Pictures apods={favPics} />
    }
    return (
        <Box sx={{ height: '800px' }}>
            Add your favourites pictures using heart icons <FavoriteBorderIcon fontSize={'small'} />
            <FavoriteBorderIcon fontSize={'small'} />
            <FavoriteBorderIcon fontSize={'small'} />
        </Box>
    )
}

export default Favourites
