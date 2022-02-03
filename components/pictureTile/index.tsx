import React from 'react';
import {IconButton, ImageListItem, ImageListItemBar} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface PictureTileProps {
  item: ApodType;
}

export interface ApodType {
  url: string;
  title: string;
  copyright: string;
  media_type: string;
  thumbnail_url: string;
  explanation: string;
  date: string;
}


function PictureTile({item}: PictureTileProps) {
  return (
      <ImageListItem>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src={item.media_type === "image" ? `${item.url}?w=164&h=164&fit=crop&auto=format` : `${item.thumbnail_url}?w=164&h=164&fit=crop&auto=format`}
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
            //TODO: add to favourites
            actionIcon={
              <IconButton
                  sx={{color: 'primary.main'}}
                  aria-label={`star ${item.title}`}
              >
                <FavoriteBorderIcon/>
              </IconButton>
            }
            actionPosition="right"
        />

      </ImageListItem>
  );
}

export default PictureTile;

