import React from 'react'
import { Button, Paper, Typography } from '@mui/material'
import YouTubeIcon from '@mui/icons-material/YouTube'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { ApodType } from '../pictureTile'

interface PictureDescriptionProps {
    apod: ApodType
    mobile: boolean
}

function PictureDescription({ apod, mobile }: PictureDescriptionProps) {
    return (
        <Paper elevation={4}>
            <Typography
                variant={mobile ? 'h6' : 'h5'}
                component="h2"
                sx={{
                    padding: '24px 12px',
                    textAlign: 'center',
                }}
            >
                {apod.title}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'light',
                }}
                gutterBottom
            >
                {apod.copyright}
            </Typography>

            <Typography variant="body2" sx={{ textAlign: 'justify', padding: 3, textIndent: '40px' }} gutterBottom>
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
    )
}

export default PictureDescription
