import {useState} from "react";
import {getDataFromStorage, setDataToStorage} from "../utils/getDataFromStorage";

export const useFavourite = (date: string) => {
  const favouritePictures = getDataFromStorage("favPics");

  const [isFavourite, setIsFavourite] = useState<boolean>(favouritePictures ? favouritePictures.some((item: string) => item === date) : false);


  const toggleFavourite = (date: string) => {
    const favouritePictures = getDataFromStorage("favPics")

    let picturesToSave: any[]
    if (isFavourite) {
      picturesToSave = favouritePictures.filter((item: string) => item !== date)
    } else {
      picturesToSave = [...favouritePictures, date]
    }
    setDataToStorage("favPics", picturesToSave)
    setIsFavourite(!isFavourite)
  }

  return {isFavourite, toggleFavourite}
}