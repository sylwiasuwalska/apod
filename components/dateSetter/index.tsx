import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';

export default function BasicDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
            label="Choose the date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} />}
        />
      </LocalizationProvider>
  );
}