import React from 'react';
import axios from 'axios'
import useSWR, {Key} from "swr";
import {IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const fetcher = (url: string) => axios.get(url).then(res => res.data)

interface ApodType {
  url: string;
  title: string;
  copyright: string;
}

function Pictures() {
  const apiURL: Key = `https://api.nasa.gov/planetary/apod?start_date=${"2022-01-10"}&end_date=${"2022-01-27"}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
  const {data: apods, error} = useSWR<ApodType[], boolean>(apiURL, fetcher)

  if (error) return "Sorry, we have encountered an error."

  if (apods) {
    return (
        <ImageList variant="masonry" cols={3} gap={8}>
          {apods.map((item) => (
              <ImageListItem key={item.url}>
                <img
                    src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={item.title}
                    subtitle={`author: ${item.copyright ? item.copyright : 'unknown'}`}
                    actionIcon={
                      <IconButton
                          sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                          aria-label={`info about ${item.title}`}
                      >
                        <FavoriteBorderIcon/>
                      </IconButton>
                    }
                />
              </ImageListItem>
          ))}
        </ImageList>
    );
  }

  return "Loading..."

}

export default Pictures;