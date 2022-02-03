import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import Pictures from "../pictures";
import DateSetter from "../dateSetter";


function Main() {

  return (
      <Container fixed>
        <Box sx={{margin: '60px 0 60px 0', borderBottom: 1 , borderColor: 'primary.contrastText', display: 'flex', alignItems:'flex-end'}}>
          <Box>
            <Typography sx={{
              color: 'primary.contrastText',
              fontFamily: "Major Mono Display",
              fontSize: '7rem',
              maxWidth: '50%'
            }} variant="h1" component="div">
              Astronomy
            </Typography>
            <Typography sx={{
              color: 'primary.contrastText',
              fontFamily: "Major Mono Display",
              fontSize: '3.5rem',
              maxWidth: '100%',
              marginBottom: 6
            }} variant="h1" component="div" gutterBottom>
              Picture of the Day
            </Typography>
          </Box>
          <Box sx={{marginBottom: 6, display: 'flex', justifyContent: 'center', width: '100%'}}>
            <DateSetter/>
          </Box>
        </Box>
        <Box>
          <Pictures />
        </Box>
      </Container>
  );
}

export default Main;