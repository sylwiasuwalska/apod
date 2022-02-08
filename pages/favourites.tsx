import {NextPage} from "next";
import Head from "next/head";
import Main from "../components/main";
import { Fragment } from "react";

const Home: NextPage = () => {
  return (
      <Fragment>
        <Head>
          <title>Astronomy Picture of the Day</title>
          <meta name="description" content="Astronomy Picture of the Day"/>
          <link rel="icon" href="/logo.svg"/>
        </Head>
        <Main/>
        <div>Favourites</div>
      </Fragment>
  )
}

export default Home
