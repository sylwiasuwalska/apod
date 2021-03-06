import { fireEvent, render, screen } from '@testing-library/react'
import PictureDialog from './index'

const mockedItemImage = {
    url: 'https://mocked.url',
    title: 'Mocked Item Title',
    copyright: 'Mocked Item Author',
    media_type: 'image',
    thumbnail_url: 'Mocked Item Thumbnail',
    explanation: 'Mocked Item Explanation Text',
    date: '2022-02-04',
    hdurl: 'https://hdurl.url',
}

describe('PictureDialog', () => {
    it('renders picture dialog with title, author, description, date, image and link', () => {
        render(
            <PictureDialog
                item={mockedItemImage}
                isOpen={true}
                handleClose={() => {}}
                isFavourite={false}
                toggleFavourite={() => {}}
            />
        )

        const title = screen.getByText(mockedItemImage.title)
        const author = screen.getByText(mockedItemImage.copyright)
        const desc = screen.getByText(mockedItemImage.explanation)
        const date = screen.getByText(mockedItemImage.date)
        const image = screen.getByTestId('apod-image')
        const link = screen.queryByText('Go to picture')

        expect(title).toBeInTheDocument()
        expect(author).toBeInTheDocument()
        expect(desc).toBeInTheDocument()
        expect(date).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(link).toBeInTheDocument()
    })

    it('renders picture dialog links with proper attributes for image', () => {
        render(
            <PictureDialog
                item={mockedItemImage}
                isOpen={true}
                handleClose={() => {}}
                isFavourite={false}
                toggleFavourite={() => {}}
            />
        )

        const link = screen.getByRole('link')

        expect(link).toHaveAttribute('href', `/${mockedItemImage.date}`)
        expect(link).toHaveAttribute('rel', 'noreferrer')
    })

    it('renders picture dialog with close button', () => {
        render(
            <PictureDialog
                item={mockedItemImage}
                isOpen={true}
                handleClose={() => {}}
                isFavourite={false}
                toggleFavourite={() => {}}
            />
        )

        const closeButton = screen.getByText('Close')

        expect(closeButton).toBeInTheDocument()
    })

    it('calls handleClose function after clicking on "Close" button', () => {
        const mockedHandleClose = jest.fn()
        render(
            <PictureDialog
                item={mockedItemImage}
                isOpen={true}
                handleClose={mockedHandleClose}
                isFavourite={false}
                toggleFavourite={() => {}}
            />
        )

        const closeButton = screen.getByText('Close')
        fireEvent.click(closeButton)
        expect(mockedHandleClose).toHaveBeenCalledTimes(1)
    })

    it('doesnt show dialog when prop isOpen set to false', () => {
        const mockedHandleClose = jest.fn()
        render(
            <PictureDialog
                item={mockedItemImage}
                isOpen={false}
                handleClose={mockedHandleClose}
                isFavourite={false}
                toggleFavourite={() => {}}
            />
        )

        const title = screen.queryByText(mockedItemImage.title)
        const author = screen.queryByText(mockedItemImage.copyright)
        const desc = screen.queryByText(mockedItemImage.explanation)

        expect(title).not.toBeInTheDocument()
        expect(author).not.toBeInTheDocument()
        expect(desc).not.toBeInTheDocument()
    })
})
