import React, { Fragment } from 'react'
import useSWR, { Key } from 'swr'
import { ApodType } from '../pictureTile'
import { fetcher } from '../main'
import { Box } from '@mui/system'
import { Button, IconButton, Paper, Skeleton, Tooltip, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import YouTubeIcon from '@mui/icons-material/YouTube'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useFavourite } from '../../hooks/useFavourite'
import { DateTime } from 'luxon'

interface PictureProps {
    date: string
}

function Picture({ date }: PictureProps) {
    const mobile = useMediaQuery('(max-width:600px)')

    const apiURL: Key = `https://api.nasa.gov/planetary/apod?date=${date}&thumbs=true&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`

    const { data: apod, error } = useSWR<ApodType, boolean>(apiURL, fetcher)
    const { isFavourite, toggleFavourite } = useFavourite(date)

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
        const imgUrl = apod.media_type === 'image' ? apod.url : apod.thumbnail_url
        return (
            <Fragment>
                <Box
                    sx={{
                        display: mobile ? 'flex' : 'block',
                        alignItems: 'flex-end',
                        flexDirection: mobile ? 'column' : null,
                        marginBottom: '30px',
                    }}
                >
                    <Box
                        data-testid="apod-image"
                        sx={{
                            backgroundImage: `url(${imgUrl})`,
                            minHeight: '400px',
                            height: mobile ? '250px' : '900px',
                            maxHeight: '80%',
                            backgroundSize: 'cover',
                            backgroundPosition: '50% 50%',
                            width: '100%',
                            borderRadius: 1,
                        }}
                    >
                        <Tooltip
                            title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                            placement="right-start"
                            arrow
                        >
                            <IconButton
                                sx={{ color: 'primary.main' }}
                                aria-label={`star ${apod.title}`}
                                onClick={() => toggleFavourite(apod)}
                                size="large"
                            >
                                {isFavourite ? (
                                    <FavoriteIcon fontSize={'large'} />
                                ) : (
                                    <FavoriteBorderIcon fontSize={'large'} />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Paper
                        elevation={6}
                        sx={{
                            width: mobile ? '100%' : '80%',
                            height: '60%',
                            margin: mobile ? '0 0 30px -40px' : '-350px -30px 0 200px',
                        }}
                    >
                        <Typography
                            variant={mobile ? 'h6' : 'h5'}
                            component="h2"
                            sx={{
                                padding: '25px 24px 0 24px',
                                textAlign: mobile ? 'center' : 'right',
                            }}
                        >
                            {apod.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: mobile ? 'center' : 'right',
                                paddingRight: 3,
                                fontWeight: 'light',
                            }}
                            gutterBottom
                        >
                            {apod.copyright}
                        </Typography>

                        <Typography variant="body2" sx={{ textAlign: 'justify', padding: 3 }} gutterBottom>
                            {apod.explanation}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: 'right',
                                paddingRight: 3,
                                fontWeight: 'light',
                                fontStyle: 'italic',
                            }}
                            gutterBottom
                        >
                            {apod.date}
                        </Typography>

                        {apod.media_type === 'video' && (
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: mobile ? 'center' : 'right',
                                    fontWeight: 'bold',
                                    padding: 3,
                                    color: 'primary.light',
                                }}
                                gutterBottom
                            >
                                <Button
                                    size="medium"
                                    variant="outlined"
                                    href={apod.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    startIcon={<YouTubeIcon />}
                                >
                                    {mobile ? 'Watch video' : 'Watch video in a new tab'}
                                </Button>
                            </Typography>
                        )}
                        {apod.media_type === 'image' && (
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: mobile ? 'center' : 'right',
                                    fontWeight: 'bold',
                                    padding: 3,
                                    color: 'primary.light',
                                }}
                                gutterBottom
                            >
                                <Button
                                    size="medium"
                                    variant="outlined"
                                    href={apod.hdurl}
                                    target="_blank"
                                    rel="noreferrer"
                                    startIcon={<ZoomInIcon />}
                                >
                                    {mobile ? 'View HD picture' : 'View HD picture in a new tab'}
                                </Button>
                            </Typography>
                        )}
                    </Paper>
                </Box>
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
