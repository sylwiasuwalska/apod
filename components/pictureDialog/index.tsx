import React, {MouseEvent} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Link, Paper, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {ApodType} from "../pictureTile";

export interface PictureDialogProps {
  item: ApodType | undefined;
  isOpen: boolean;
  handleClose: (event: MouseEvent) => void;
}

function PictureDialog({item, isOpen, handleClose}: PictureDialogProps) {
  const imgUrl = item?.media_type === "image" ? item?.url : item?.thumbnail_url;
  return (
      <Dialog
          fullWidth
          maxWidth={"lg"}
          open={isOpen}
          onClose={handleClose}
      >

        <DialogContent>
          <Box sx={{display: 'flex', alignItems: 'flex-end', flexDirection: ['column', 'column', 'row', 'row', 'row'] }}>
            <Box sx={{
              backgroundImage: `url(${imgUrl})`,
              minHeight: '400px',
              height: '500px',
              maxHeight: '80%',
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
              width:['100%', '100%', '100%', '80%', '80%'],
              borderRadius: 1
            }} />
            <Paper elevation={6} sx={{width: ['100%', '100%', '100%', '60%', '60%'],
              height: '60%',
              margin: '0 0 30px -40px'
            }}>

              <Typography variant="h5" component="h2" sx={{padding: "25px 24px 0 24px", textAlign: 'right'}}>
                {item?.title}
              </Typography>
              <Typography variant="body2" sx={{textAlign: 'right', paddingRight: 3, fontWeight: 'light'}} gutterBottom>
                {item?.copyright}
              </Typography>

              <Typography variant="body2" sx={{textAlign: 'justify', padding: 3,}} gutterBottom>
                {item?.explanation}
              </Typography>
              {item?.media_type === "video" && <Typography variant="body2" sx={{textAlign: 'right', fontWeight: 'bold', paddingRight: 3, color: 'primary.light'}} gutterBottom>
                <Link href={item?.url}>Watch Video</Link>
              </Typography>}
              <Typography variant="body2" sx={{textAlign: 'right', padding: 3, fontWeight: 'light', fontStyle: 'italic'}} gutterBottom>
                {item?.date}
              </Typography>
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