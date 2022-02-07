import React, {Fragment} from 'react';
import axios from 'axios';
import useSWR, {Key} from "swr";
import {
  ImageList,
  ImageListItem,
  Skeleton
} from "@mui/material";
import {Box} from '@mui/system';
import PictureTile, {ApodType} from "../pictureTile";

import useMediaQuery from '@mui/material/useMediaQuery';

export const fetcher = (url: string) => axios.get(url).then(res => res.data)


function Pictures() {
  const apiURL: Key = `https://api.nasa.gov/planetary/apod?start_date=${"2022-01-12"}&end_date=${"2022-01-26"}&thumbs=true&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
  const {data: apods, error} = useSWR<ApodType[], boolean>(apiURL, fetcher)

  const mobile = useMediaQuery('(max-width:600px)');
  const xs = useMediaQuery('(min-width:600px)');
  const sm = useMediaQuery('(min-width:900px)');
  const md = useMediaQuery('(min-width:1200px)');

  const getNumberOfColumns = () => {
    if (md) return 3;
    if (sm) return 2;
    if (xs) return 1;
    if (mobile) return 1;
  }

  const placeholders = [...Array(15)]

  if (error) return <div>Sorry, we have encountered an error.</div>

  if (apods) {
    return (
        <Fragment>
          <ImageList variant="masonry" cols={getNumberOfColumns()} gap={8}>
          {apods.map((item) => (
                <PictureTile key={item.url} item={item}/>
          ))}
        </ImageList>

        </Fragment>
    );
  }

  return <ImageList variant="masonry" cols={getNumberOfColumns()} gap={8}>
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