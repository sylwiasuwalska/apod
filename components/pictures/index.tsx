import React from 'react'
import { ImageList, ImageListItem, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import PictureTile, { ApodType } from '../pictureTile'

import useMediaQuery from '@mui/material/useMediaQuery'

export interface PicturesProps {
    apods?: ApodType[]
}

function Pictures({ apods }: PicturesProps) {
    const mobile = useMediaQuery('(max-width:600px)')
    const xs = useMediaQuery('(min-width:600px)')
    const sm = useMediaQuery('(min-width:900px)')
    const md = useMediaQuery('(min-width:1200px)')

    const getNumberOfColumns = () => {
        if (md) return 3
        if (sm) return 2
        if (xs) return 1
        if (mobile) return 1
    }

    const placeholders = [...Array(15)]

    if (apods) {
        return (
            <ImageList variant="masonry" cols={getNumberOfColumns()} gap={8}>
                {apods.map((item) => (
                    <PictureTile key={item.url} item={item} />
                ))}
            </ImageList>
        )
    }

    return (
        <ImageList variant="masonry" cols={getNumberOfColumns()} gap={8}>
            {placeholders.map((item, index) => {
                return (
                    <ImageListItem key={index} sx={{ width: '100%', padding: '20px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <Skeleton animation="wave" height={30} width="100%" />
                                <Skeleton animation="wave" height={40} width="100%" />
                            </Box>
                            <Skeleton animation="wave" width={80} height={100} sx={{ marginLeft: 4 }} />
                        </Box>

                        <Skeleton sx={{ height: 190, marginTop: 2 }} animation="wave" variant="rectangular" />
                    </ImageListItem>
                )
            })}
        </ImageList>
    )
}

export default Pictures
