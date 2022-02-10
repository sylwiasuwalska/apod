import Link from 'next/link'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'

function FavouriteLink() {
    const mobile = useMediaQuery('(max-width:600px)')
    return (
        <Tooltip title={'See your favourites'} placement="left-start" arrow>
            <Box sx={{ position: 'absolute', top: mobile ? 0 : '20px', right: mobile ? 0 : '20px' }}>
                <Link href="/favourites">
                    <IconButton sx={{ color: 'primary.header' }} aria-label={`Your favourites pictures`} size="large">
                        <FavoriteBorderIcon fontSize={mobile ? 'medium' : 'large'} />
                    </IconButton>
                </Link>
            </Box>
        </Tooltip>
    )
}

export default FavouriteLink
