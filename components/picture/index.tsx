import React, { Fragment, useState } from 'react'
import useSWR, { Key } from 'swr'
import { ApodType } from '../pictureTile'
import { fetcher } from '../main'
import { Box } from '@mui/system'
import { Button, Dialog, DialogActions, DialogContent, Skeleton } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useFavourite } from '../../hooks/useFavourite'
import { DateTime } from 'luxon'
import PictureDescription from './pictureDescription'
import Magnifier from 'react-magnifier'
import PictureIcons from '../pictureDialog/pictureIcons'
import ReactPlayer from 'react-player'

interface PictureProps {
    date: string
}

function Picture({ date }: PictureProps) {
    const mobile = useMediaQuery('(max-width:600px)')

    const apiURL: Key = `https://api.nasa.gov/planetary/apod?date=${date}&thumbs=true&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`

    const { data: apod, error } = useSWR<ApodType, boolean>(apiURL, fetcher)
    const { isFavourite, toggleFavourite } = useFavourite(date)
    const [isInfoOpen, setIsInfoOpen] = useState(false)

    if (!apod && !error) {
        return (
            <Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center' }} data-testid="loader">
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Skeleton animation="wave" height={30} width="100%" />
                        <Skeleton animation="wave" height={40} width="100%" />
                    </Box>
                    <Skeleton animation="wave" width={80} height={100} sx={{ marginLeft: 4 }} />
                </Box>

                <Skeleton sx={{ height: 300, marginTop: 2 }} animation="wave" variant="rectangular" />
            </Fragment>
        )
    }
    if (apod) {
        return (
            <Fragment>
                <Box sx={{ marginBottom: '30px' }}>
                    <Fragment>
                        <Box sx={{ textAlign: 'right' }}>
                            <PictureIcons
                                isFavourite={isFavourite}
                                apod={apod}
                                toggleFavourite={toggleFavourite}
                                setIsInfoOpen={setIsInfoOpen}
                                isInfoOpen={isInfoOpen}
                            />
                        </Box>
                        {apod.media_type === 'image' ? (
                            <Magnifier
                                src={apod.hdurl}
                                mgWidth={mobile ? 100 : 300}
                                mgHeight={mobile ? 100 : 300}
                                mgBorderWidth={0}
                            />
                        ) : (
                            <ReactPlayer url={apod.url} width="100%" height="600px" controls={true} />
                        )}
                    </Fragment>
                </Box>
                <Dialog fullWidth maxWidth={'md'} open={isInfoOpen} onClose={() => setIsInfoOpen(false)}>
                    <DialogContent>
                        <PictureDescription apod={apod} mobile={mobile} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsInfoOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
    if (error)
        return (
            <Box sx={{ height: '800px' }}>
                <p data-testid={'error-message'}>
                    We have encountered an error. Please be sure your date is between 1995-06-16 and{' '}
                    {DateTime.now().toISODate()}
                </p>
            </Box>
        )
    return null
}

export default Picture
