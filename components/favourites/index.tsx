import React from 'react';
import {getDataFromStorage} from "../../utils/getDataFromStorage";

function Favourites() {
  const favouritePictures = getDataFromStorage("favPics");

  if (favouritePictures) {
    return (
        <div></div>
    );
  }
  return <div>Add favourites pictures</div>

}

export default Favourites;