import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header'
import { Fragment } from 'react'
import { Container } from '@mui/material'

import { useRouter } from 'next/router'
import Picture from '../components/picture'

const DatePage: NextPage = () => {
    const router = useRouter()
    const { date } = router.query
    return (
        <Fragment>
            <Head>
                <title>{date} | Astronomy Picture of the Day</title>
                <meta name="description" content="Astronomy Index of the Day" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <Container fixed>
                <Picture date={date as string} />
            </Container>
        </Fragment>
    )
}

export default DatePage
