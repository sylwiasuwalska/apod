import type {NextPage} from 'next'
import Head from 'next/head'

import Header from "../components/header";
import {Box, Container} from "@mui/material";
import React, { Fragment } from 'react';

import Main from '../components/main';



const Home: NextPage = () => {
  return (
      <Fragment>
        <Head>
          <title>Astronomy Picture of the Day</title>
          <meta name="description" content="Astronomy Picture of the Day"/>
          <link rel="icon" href="/logo.svg"/>
        </Head>
        <Header />
        <Container fixed>
        <Box>
          <Main />
        </Box>
        </Container>
      </Fragment>
  )
}

export default Home
