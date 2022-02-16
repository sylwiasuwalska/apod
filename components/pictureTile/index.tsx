import React, { Fragment, useState } from 'react'
import { IconButton, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useFavourite } from '../../hooks/useFavourite'
import PictureDialog from '../pictureDialog'
import { getImageUrl } from '../../utils/getImageUrl'

interface PictureTileProps {
    item: ApodType
}

export interface ApodType {
    url: string
    title: string
    copyright: string
    media_type: string
    thumbnail_url: string
    explanation: string
    date: string
    hdurl: string
}

function PictureTile({ item }: PictureTileProps) {
    const { isFavourite, toggleFavourite } = useFavourite(item.date)

    const [open, setOpen] = useState(false)

    const handleClickingFavourite = (e: React.MouseEvent<HTMLElement>) => {
        toggleFavourite(item)
        e.stopPropagation()
    }

    return (
        <Fragment>
            <ImageListItem onClick={() => setOpen(true)} sx={{ cursor: 'pointer' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={item.media_type === 'image' ? getImageUrl(item.url) : getImageUrl(item.thumbnail_url)}
                    alt={`${item.title} image`}
                    loading="lazy"
                />
                <ImageListItemBar
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    title={item.title}
                    subtitle={item.copyright && <span>author: {item.copyright}</span>}
                    position="top"
                    // TODO: Adding to favourites
                    actionIcon={
                        <Tooltip
                            title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                            placement="right-start"
                            arrow
                        >
                            <IconButton
                                sx={{ color: 'primary.main' }}
                                aria-label={`star ${item.title}`}
                                onClick={(e) => handleClickingFavourite(e)}
                            >
                                {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Tooltip>
                    }
                    actionPosition="right"
                />
            </ImageListItem>
            <PictureDialog
                item={item}
                isOpen={open}
                handleClose={() => setOpen(false)}
                isFavourite={isFavourite}
                toggleFavourite={toggleFavourite}
            />
        </Fragment>
    )
}

export default PictureTile
