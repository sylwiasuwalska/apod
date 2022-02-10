import { render, screen } from '@testing-library/react'
import PictureTile from './index'

const mockedItemImage = {
    url: 'https://mocked.url',
    hdurl: 'https://mocked.hdurl',
    title: 'Mocked Item Title',
    copyright: 'Mocked Item Author',
    media_type: 'image',
    thumbnail_url: 'Mocked Item Thumbnail',
    explanation: 'Mocked Item Explanation Text',
    date: '2022-02-04',
}

describe('PictureTile', () => {
    it('renders picture tile with title, author, image and icon', () => {
        render(<PictureTile item={mockedItemImage} />)

        const title = screen.getByText(mockedItemImage.title)
        const author = screen.getByText(`author: ${mockedItemImage.copyright}`)
        const image = screen.getByAltText(`${mockedItemImage.title} image`)
        const icon = screen.getByRole('button', { name: `star ${mockedItemImage.title}` })

        expect(title).toBeInTheDocument()
        expect(author).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
    })
})
