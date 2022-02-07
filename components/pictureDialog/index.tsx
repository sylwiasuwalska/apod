import React, {MouseEvent} from 'react';
import {Button, Dialog, DialogActions, DialogContent, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {ApodType} from "../pictureTile";
import YouTubeIcon from '@mui/icons-material/YouTube';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useFavourite} from "../../hooks/useFavourite";

export interface PictureDialogProps {
  item: ApodType;
  isOpen: boolean;
  handleClose: (event: MouseEvent) => void;
}

function PictureDialog({item, isOpen, handleClose}: PictureDialogProps) {
  const imgUrl = item.media_type === "image" ? item.url : item.thumbnail_url;
  const {isFavourite, toggleFavourite} = useFavourite(item.date);

  return (
      <Dialog
          fullWidth
          maxWidth={"lg"}
          open={isOpen}
          onClose={handleClose}
      >

        <DialogContent>
          <Box sx={{display: 'flex', alignItems: 'flex-end', flexDirection: ['column', 'column', 'row', 'row', 'row']}}>
            <Box data-testid="apod-image" sx={{
              backgroundImage: `url(${imgUrl})`,
              minHeight: '400px',
              height: '500px',
              maxHeight: '80%',
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
              width: ['100%', '100%', '100%', '80%', '80%'],
              borderRadius: 1
            }}>
              <Tooltip title={isFavourite ? "Remove from favourites" : "Add to favourites"} placement="right-start" arrow>
                <IconButton
                    sx={{color: 'primary.main'}}
                    aria-label={`star ${item.title}`}
                    onClick={() => toggleFavourite(item.date)}
                >
                  {isFavourite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </IconButton>
              </Tooltip>
            </Box>
            <Paper elevation={6} sx={{
              width: ['100%', '100%', '100%', '60%', '60%'],
              height: '60%',
              margin: '0 0 30px -40px'
            }}>

              <Typography variant="h5" component="h2" sx={{padding: "25px 24px 0 24px", textAlign: 'right'}}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{textAlign: 'right', paddingRight: 3, fontWeight: 'light'}} gutterBottom>
                {item.copyright}
              </Typography>

              <Typography variant="body2" sx={{textAlign: 'justify', padding: 3,}} gutterBottom>
                {item.explanation}
              </Typography>
              <Typography variant="body2"
                          sx={{textAlign: 'right', paddingRight: 3, fontWeight: 'light', fontStyle: 'italic'}}
                          gutterBottom>
                {item.date}
              </Typography>

              {item.media_type === "video" && <Typography variant="body2" sx={{
                textAlign: 'right',
                fontWeight: 'bold',
                padding: 3,
                color: 'primary.light'
              }} gutterBottom>
                  <Button size="medium" variant="outlined" href={item.url} target="_blank" rel="noreferrer"
                          startIcon={<YouTubeIcon/>}>
                      Watch video in a new tab
                  </Button>
              </Typography>}
              {item.media_type === "image" && <Typography variant="body2" sx={{
                textAlign: 'right',
                fontWeight: 'bold',
                padding: 3,
                color: 'primary.light'
              }} gutterBottom>
                  <Button size="medium" variant="outlined" href={item.hdurl} target="_blank" rel="noreferrer"
                          startIcon={<ZoomInIcon/>}>
                      View HD picture in a new tab
                  </Button>
              </Typography>}


            </Paper>

          </Box>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
  );
}

export default PictureDialog;