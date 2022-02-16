import React, { Fragment } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { ApodType } from '../pictureTile'

interface PictureIconsProps {
    isFavourite: boolean
    apod: ApodType
    toggleFavourite: (apod: ApodType) => void
    setIsInfoOpen: (arg: boolean) => void
    isInfoOpen: boolean
}

function PictureIcons({ isFavourite, apod, toggleFavourite, setIsInfoOpen, isInfoOpen }: PictureIconsProps) {
    return (
        <Fragment>
            {' '}
            <Tooltip title={isFavourite ? 'Remove from favourites' : 'Add to favourites'} placement="right-start" arrow>
                <IconButton
                    sx={{ color: 'primary.main' }}
                    aria-label={`star ${apod.title}`}
                    onClick={() => toggleFavourite(apod)}
                    size="large"
                >
                    {isFavourite ? <FavoriteIcon fontSize={'large'} /> : <FavoriteBorderIcon fontSize={'large'} />}
                </IconButton>
            </Tooltip>
            <Tooltip title="See more details" placement="right-start" arrow>
                <IconButton
                    sx={{ color: 'primary.main' }}
                    aria-label={`open more details`}
                    onClick={() => setIsInfoOpen(!isInfoOpen)}
                    size="large"
                >
                    <InfoOutlinedIcon fontSize={'large'} />
                </IconButton>
            </Tooltip>
        </Fragment>
    )
}

export default PictureIcons
