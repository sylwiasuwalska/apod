import {NextPage} from "next";
import Head from "next/head";
import Header from "../components/header";
import { Fragment } from "react";
import { Container } from "@mui/material";
import Favourites from "../components/favourites";

const Home: NextPage = () => {
  return (
      <Fragment>
        <Head>
          <title>Favourites | Astronomy Picture of the Day</title>
          <meta name="description" content="Astronomy Picture of the Day"/>
          <link rel="icon" href="/logo.svg"/>
        </Head>
        <Header/>
        <Container fixed>
         <Favourites />
        </Container>
      </Fragment>
  )
}

export default Home
