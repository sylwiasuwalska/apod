import React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import axios from 'axios'
import Main from './index'
import { act } from 'react-dom/test-utils'
import { SWRConfig } from 'swr'

const mockedDataFromAPI = [
    {
        copyright: 'Blake Estesitelescope.net',
        date: '2022-01-12',
        explanation:
            "What does Comet Leonard look like up close? Although we can't go there, imaging the comet's coma and inner tails through a small telescope gives us a good idea.  As the name implies, the ion tail is made of ionized gas -- gas energized by ultraviolet light from the Sun and pushed outward by the solar wind.  The solar wind is quite structured and sculpted by the Sun's complex and ever changing magnetic field. The effect of the variable solar wind combined with different gas jets venting from the comet's nucleus accounts for the tail's complex structure.  Following the wind, structure in Comet Leonard's tail can be seen to move outward from the Sun even alter its wavy appearance over time.  The blue color of the ion tail is dominated by recombining carbon monoxide molecules, while the green color of the coma surrounding the head of the comet is created mostly by a slight amount of recombining diatomic carbon molecules. Diatomic carbon is destroyed by sunlight in about 50 hours -- which is why its green glow does not make it far into the ion tail. The featured image was taken on January 2 from Siding Spring Observatory in Australia.  Comet Leonard, presently best viewed from Earth's Southern Hemisphere, has rounded the Sun and is now headed out of the Solar System.",
        hdurl: 'https://apod.nasa.gov/apod/image/2201/CometLeonard_Estes_3000.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'Comet Leonard Closeup from Australia',
        url: 'https://apod.nasa.gov/apod/image/2201/CometLeonard_Estes_960.jpg',
    },
    {
        copyright: 'Jason Dain',
        date: '2022-01-13',
        explanation:
            "It's easy to get lost following the intricate, looping, twisting filaments in this detailed image of supernova remnant Simeis 147. Also cataloged as Sharpless 2-240 it goes by the popular nickname, the Spaghetti Nebula. Seen toward the boundary of the constellations Taurus and Auriga, it covers nearly 3 degrees or 6 full moons on the sky. That's about 150 light-years at the stellar debris cloud's estimated distance of 3,000 light-years. This composite includes image data taken through narrow-band filters where reddish emission from ionized hydrogen atoms and doubly ionized oxygen atoms in faint blue-green hues trace the shocked, glowing gas. The supernova remnant has an estimated age of about 40,000 years, meaning light from the massive stellar explosion first reached Earth 40,000 years ago. But the expanding remnant is not the only aftermath. The cosmic catastrophe also left behind a spinning neutron star or pulsar, all that remains of the original star's core.",
        hdurl: 'https://apod.nasa.gov/apod/image/2201/HOOClassicBinned_ps2048.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'Supernova Remnant Simeis 147',
        url: 'https://apod.nasa.gov/apod/image/2201/HOOClassicBinned_ps1024.jpg',
    },
]

const MainWithSWRWrapper = () => (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
        <Main />
    </SWRConfig>
)

describe('Main', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        jest.useFakeTimers()
    })

    it('displays loader on first render', () => {
        render(<MainWithSWRWrapper />)
        const loader = screen.getByTestId('loader')
        expect(loader).toBeInTheDocument()
    })

    it('fetches data from API and renders pictures from array', async () => {
        jest.spyOn(axios, 'get').mockResolvedValueOnce({
            data: mockedDataFromAPI,
        })
        render(<MainWithSWRWrapper />)

        act(() => {
            jest.runAllTimers()
        })
        await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
        const title1 = screen.getByText(mockedDataFromAPI[0].title)
        const title2 = screen.getByText(mockedDataFromAPI[1].title)

        const copyright1 = screen.getByText(`author: ${mockedDataFromAPI[0].copyright}`)
        const copyright2 = screen.getByText(`author: ${mockedDataFromAPI[1].copyright}`)

        const picture1 = screen.getByAltText(`${mockedDataFromAPI[0].title} image`)
        const picture2 = screen.getByAltText(`${mockedDataFromAPI[1].title} image`)

        expect(title1).toBeInTheDocument()
        expect(title2).toBeInTheDocument()

        expect(copyright1).toBeInTheDocument()
        expect(copyright2).toBeInTheDocument()

        expect(picture1).toBeInTheDocument()
        expect(picture2).toBeInTheDocument()
    })

    it('displays error when API called has error', async () => {
        jest.spyOn(axios, 'get').mockRejectedValue(() => ({}))

        render(<MainWithSWRWrapper />)

        act(() => {
            jest.runAllTimers()
        })
        await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
        const errorMessage = screen.getByText('Sorry, we have encountered an error.')
        expect(errorMessage).toBeInTheDocument()
    })
})
