import React from 'react';
import {Box, Container, Grid, Typography} from "@mui/material";
import Pictures from "../pictures";
import DateSetter from "../dateSetter";


function Main() {
  return (
      <Container fixed>
        <Grid container columns={{ xs: 1, sm: 2, md: 2 }} sx={{margin: '60px 0 60px 0', borderBottom: 1 , borderColor: 'primary.contrastText'}}>
          <Grid item >
            <Typography sx={{
              color: 'primary.contrastText',
              fontFamily: "Major Mono Display",
              fontSize:  ['3.1rem', '5rem', '7rem', '7rem', '7rem'],
              maxWidth: '50%',
            }} variant="h1" component="div">
              Astronomy
            </Typography>
            <Typography sx={{
              color: 'primary.light',
              fontFamily: "Major Mono Display",
              fontSize: ['1.5rem', '2.5rem', '3.5rem', '3.5rem', '3.5rem'],
              maxWidth: '100%',
              marginBottom: 6
            }} variant="h1" component="div" gutterBottom>
              Picture of the Day
            </Typography>
          </Grid>
          <Grid item sx={{marginBottom: 6, display: 'flex', justifyContent: 'center', alignItems:'flex-end', flexGrow:'1'}}>
            <DateSetter/>
          </Grid>
        </Grid>
        <Box>
          <Pictures />
        </Box>
      </Container>
  );
}

export default Main;