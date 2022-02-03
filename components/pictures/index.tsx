import React, {Fragment, useState} from 'react';
import axios from 'axios';
import useSWR, {Key} from "swr";
import {
  Button,
Dialog, DialogActions,
  DialogContent,
  ImageList,
  ImageListItem, Paper,
  Skeleton,
  Typography
} from "@mui/material";
import {Box} from '@mui/system';
import PictureTile, {ApodType} from "../pictureTile";

const fetcher = (url: string) => axios.get(url).then(res => res.data)


function Pictures() {
  const apiURL: Key = `https://api.nasa.gov/planetary/apod?start_date=${"2022-01-01"}&end_date=${"2022-01-18"}&thumbs=true&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
  const {data: apods, error} = useSWR<ApodType[], boolean>(apiURL, fetcher)
  const [currentItem, setCurrentItem] = useState<ApodType | undefined>()
  const [open, setOpen] = useState(false);
  const handleOpen = (item: ApodType) => {
    setCurrentItem(item)
    setOpen(true)
  };

  const handleClose = () => setOpen(false);

  const placeholders = [...Array(18)]

  if (error) return <div>Sorry, we have encountered an error.</div>

  if (apods) {
    return (
        <Fragment><ImageList variant="masonry" cols={3} gap={8}>
          {apods.map((item) => (
              <div key={item.url} onClick={() => handleOpen(item)}>
                <PictureTile item={item}/>
              </div>

          ))}
        </ImageList>
          <Dialog
              fullWidth
              maxWidth={"lg"}
              open={open}
              onClose={handleClose}
          >
            <DialogContent>
              <Box sx={{display: 'flex', alignItems: 'flex-end' }}>
                <Box sx={{
                  backgroundImage: `url(${currentItem?.url})`,
                  minHeight: '400px',
                  height: '500px',
                  maxHeight: '80%',
                  backgroundSize: 'cover',
                  backgroundPosition: '50% 50%',
                  maxWidth: '80%',
                  width: '80%',
                  borderRadius: 1
                }} />
                <Paper elevation={6} sx={{width: '60%', height: '60%', margin: '0 0 30px -40px'}}>

                  <Typography variant="h5" component="h2" sx={{padding: "25px 24px 0 24px", textAlign: 'right'}}>
                    {currentItem?.title}
                  </Typography>
                  <Typography variant="body2" sx={{textAlign: 'right', paddingRight: 3, fontWeight: 'light'}} gutterBottom>
                    {currentItem?.copyright}
                  </Typography>

                  <Typography variant="body2" sx={{textAlign: 'justify', padding: 3,}} gutterBottom>
                    {currentItem?.explanation}
                  </Typography>
                  <Typography variant="body2" sx={{textAlign: 'right', padding: 3, fontWeight: 'light', fontStyle: 'italic'}} gutterBottom>
                    {currentItem?.date}
                  </Typography>
                </Paper>

              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </Fragment>
    );
  }

  return <ImageList variant="masonry" cols={3} gap={8}>
    {placeholders.map((item, index) => {
      return <ImageListItem key={index} sx={{width: '100%', padding: '20px'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>

          <Box sx={{display: 'flex', flexDirection: 'column', width: '100%',}}>
            <Skeleton animation="wave" height={30} width="100%"/>
            <Skeleton animation="wave" height={40} width="100%"/>
          </Box>
          <Skeleton animation="wave" width={80} height={100} sx={{marginLeft: 4}}/>
        </Box>

        <Skeleton sx={{height: 190, marginTop: 2}} animation="wave" variant="rectangular"/>
      </ImageListItem>
    })}

  </ImageList>

}

export default Pictures;