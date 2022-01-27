import React, {useState} from 'react';
import {Box, Container, LinearProgress, Typography} from "@mui/material";
import Pictures from "../pictures";


function Main() {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
      <Container fixed>
        <Box sx={{margin: '60px 0 60px 0', borderBottom: isLoaded ? 4 : 0, borderColor: 'primary.contrastText'}}>
          <Typography sx={{color: 'primary.contrastText', fontSize: '5rem'}} variant="h1" component="div" gutterBottom>
            Astronomy Picture of the Day
          </Typography>
          {!isLoaded && <LinearProgress sx={{color: '#bdbdbd'}}/>}
        </Box>
        <Box>
          <Pictures setLoader={setIsLoaded}/>
        </Box>
      </Container>
  );
}

export default Main;