import Link from 'next/link'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
import Badge from '@mui/material/Badge'
import { FavouritesContext } from '../../contexts/favourites/favouritesContext'
import { useContext } from 'react'

function FavouriteLink() {
    const mobile = useMediaQuery('(max-width:600px)')
    const { favouritePictures } = useContext(FavouritesContext)
    return (
        <Tooltip title={'See your favourites'} placement="left-start" arrow>
            <Box sx={{ position: 'absolute', top: mobile ? 0 : '20px', right: mobile ? 0 : '20px' }}>
                <Link href="/favourites" passHref>
                    <IconButton sx={{ color: 'primary.header' }} aria-label={`Your favourites pictures`} size="large">
                        <Badge badgeContent={Object.keys(favouritePictures).length} color="primary">
                            <FavoriteBorderIcon fontSize={mobile ? 'medium' : 'large'} />
                        </Badge>
                    </IconButton>
                </Link>
            </Box>
        </Tooltip>
    )
}
export default FavouriteLink
