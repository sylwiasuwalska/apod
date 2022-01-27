import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import Pictures from "../pictures";


function Main() {
  return (
      <Container fixed>
        <Box>
          <Typography sx={{color: 'primary.contrastText'}} variant="h2" component="div" gutterBottom>
            Astronomy Picture of the Day
          </Typography>
        </Box>
        <Box>
          <Typography sx={{color: 'primary.contrastText'}} variant="h5" component="div" gutterBottom>
            Pictures
          </Typography>
          <Pictures/>

        </Box>
      </Container>
  );
}

export default Main;