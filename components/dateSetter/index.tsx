import {Fragment, useState} from "react";
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from '@mui/lab';
import PictureDialog from "../pictureDialog";
import {ApodType} from "../pictureTile";
import useSWR, {Key} from "swr";
import {fetcher} from "../pictures";
import { DateTime } from "luxon";


export default function DateSetter() {

  const [date, setDate] = useState<string>(DateTime.now().toISODate());
  const apiURL: Key = `https://api.nasa.gov/planetary/apod?date=${date}&thumbs=true&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
  const {data: currentApod, error} = useSWR<ApodType, boolean>(date ? apiURL : null, fetcher)

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
      <Fragment>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
              allowSameDateSelection
              maxDate={DateTime.now()}
              minDate={DateTime.fromISO('1995-06-16T00:00:00.000')}
              label="Choose the date"
              value={date}
              inputFormat="yyyy/MM/dd"
              onChange={(newValue) => {
                setOpen(true);
                if (newValue) {
                  setDate(newValue.toISODate());
                }
              }}
              renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <PictureDialog item={currentApod} isOpen={open} handleClose={handleClose}/>
      </Fragment>
  );
}