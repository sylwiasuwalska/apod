import React from 'react';
import {IconButton, ImageListItem, ImageListItemBar, Tooltip} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useFavourite} from "../../hooks/useFavourite";

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
  hdurl: string;
}


function PictureTile({item}: PictureTileProps) {
  const {isFavourite, toggleFavourite} = useFavourite(item.date);

  const handleClickingFavourite = (e: React.MouseEvent<HTMLElement>) => {
    toggleFavourite(item.date);
    e.stopPropagation();
  }

  return (
      <ImageListItem>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            src={item.media_type === "image" ? `${item.url}?w=164&h=164&fit=crop&auto=format` : `${item.thumbnail_url}?w=164&h=164&fit=crop&auto=format`}
            alt={`${item.title} image`}
            loading="lazy"
        />
        <ImageListItemBar
            sx={{
              background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            title={item.title}
            subtitle={item.copyright && <span>author: {item.copyright}</span>}
            position="top"
            // TODO: Adding to favourites
            actionIcon={
              <Tooltip title={isFavourite ? "Remove from favourites" : "Add to favourites"} placement="right-start" arrow>
                <IconButton
                    sx={{color: 'primary.main'}}
                    aria-label={`star ${item.title}`}
                    onClick={(e) => handleClickingFavourite(e)}
                >
                  {isFavourite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </IconButton>
              </Tooltip>
            }
            actionPosition="right"
        />
      </ImageListItem>
  );
}

export default PictureTile;

