import { useEffect } from 'react';
import axios from 'axios';
import useSWR, {Key} from "swr";
import {IconButton, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const fetcher = (url: string) => axios.get(url).then(res => res.data)

interface PicturesProps {
  setLoader(arg: boolean): void;
}

interface ApodType {
  url: string;
  title: string;
  copyright: string;
  media_type: string;
  thumbnail_url: string;
}

function Pictures({setLoader}: PicturesProps) {
  const apiURL: Key = `https://api.nasa.gov/planetary/apod?start_date=${"2022-01-10"}&end_date=${"2022-01-27"}&thumbs=true&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
  const {data: apods, error} = useSWR<ApodType[], boolean>(apiURL, fetcher)

  useEffect(()=>{
    if (apods) {
      setLoader(true)
    }
  },[apods])

  if (error) return <div>Sorry, we have encountered an error.</div>

  if (apods) {
    return (
        <ImageList variant="masonry" cols={3} gap={8}>
          {apods.map((item) => (
              <ImageListItem key={item.url}>
                <img
                    src={item.media_type==="image" ? `${item.url}?w=164&h=164&fit=crop&auto=format` : `${item.thumbnail_url}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                />
                <ImageListItemBar
                    sx={{
                      background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    title={item.title}
                    subtitle={<span>author: {item.copyright ? item.copyright : "unknown"}</span>}
                    position="top"
                    actionIcon={
                      <IconButton
                          sx={{ color: 'white' }}
                          aria-label={`star ${item.title}`}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    }
                    actionPosition="right"
                />
              </ImageListItem>
          ))}
        </ImageList>
    );
  }

  return <div>Loading...</div>

}

export default Pictures;