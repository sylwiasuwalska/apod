import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import Picture from '../picture'
import axios from 'axios'
import { act } from 'react-dom/test-utils'
import React from 'react'
import { SWRConfig } from 'swr'

const mockedDataFromAPI = {
    copyright: 'Blake Estesitelescope.net',
    date: '2022-01-12',
    explanation:
        "What does Comet Leonard look like up close? Although we can't go there, imaging the comet's coma and inner tails through a small telescope gives us a good idea.  As the name implies, the ion tail is made of ionized gas -- gas energized by ultraviolet light from the Sun and pushed outward by the solar wind.  The solar wind is quite structured and sculpted by the Sun's complex and ever changing magnetic field. The effect of the variable solar wind combined with different gas jets venting from the comet's nucleus accounts for the tail's complex structure.  Following the wind, structure in Comet Leonard's tail can be seen to move outward from the Sun even alter its wavy appearance over time.  The blue color of the ion tail is dominated by recombining carbon monoxide molecules, while the green color of the coma surrounding the head of the comet is created mostly by a slight amount of recombining diatomic carbon molecules. Diatomic carbon is destroyed by sunlight in about 50 hours -- which is why its green glow does not make it far into the ion tail. The featured image was taken on January 2 from Siding Spring Observatory in Australia.  Comet Leonard, presently best viewed from Earth's Southern Hemisphere, has rounded the Sun and is now headed out of the Solar System.",
    hdurl: 'https://apod.nasa.gov/apod/image/2201/CometLeonard_Estes_3000.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Comet Leonard Closeup from Australia',
    url: 'https://apod.nasa.gov/apod/image/2201/CometLeonard_Estes_960.jpg',
}

const PictureWithSWRWrapper = ({ ...props }) => (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
        <Picture date={props.date} {...props} />
    </SWRConfig>
)

describe('Picture', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        jest.useFakeTimers()
    })

    it('displays loader on first render', () => {
        render(<PictureWithSWRWrapper date={'2021-01-12'} />)
        const loader = screen.getByTestId('loader')
        expect(loader).toBeInTheDocument()
    })

    it('fetches data from API and renders picture info', async () => {
        jest.spyOn(axios, 'get').mockResolvedValueOnce({
            data: mockedDataFromAPI,
        })
        render(<PictureWithSWRWrapper date={'2021-01-12'} />)

        act(() => {
            jest.runAllTimers()
        })
        await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

        const infoIcon = screen.getByLabelText('open more details')
        fireEvent.click(infoIcon)

        const title = screen.getByText(mockedDataFromAPI.title)
        const copyright = screen.getByText(mockedDataFromAPI.copyright)
        const date = screen.getByText(mockedDataFromAPI.date)

        expect(title).toBeInTheDocument()
        expect(copyright).toBeInTheDocument()
        expect(date).toBeInTheDocument()
    })

    it('shows error message in case of error', async () => {
        jest.spyOn(axios, 'get').mockRejectedValue(() => {})
        render(<PictureWithSWRWrapper date={'2021-01-12'} />)

        act(() => {
            jest.runAllTimers()
        })
        await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

        const errorMessage = screen.getByTestId('error-message')

        expect(errorMessage).toBeInTheDocument()
    })
})
