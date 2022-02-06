import {fireEvent, render, screen } from '@testing-library/react'
import PictureDialog from './index'

const mockedItemImage = {
  url: "https://mocked.url",
  title: "Mocked Item Title",
  copyright: "Mocked Item Author",
  media_type: "image",
  thumbnail_url: "Mocked Item Thumbnail",
  explanation: "Mocked Item Explanation Text",
  date: "2022-02-04",
}

const mockedItemVideo = {
  url: "https://mocked.url.for.video",
  title: "Mocked Item Title - Video",
  copyright: "Mocked Item Author - Video",
  media_type: "video",
  thumbnail_url: "Mocked Item Thumbnail - Video",
  explanation: "Mocked Item Explanation Text - Video",
  date: "2022-02-04",
}

describe('PictureDialog', () => {
  it('renders picture dialog with title, author, description, date and image', () => {
    render(<PictureDialog item={mockedItemImage} isOpen={true} handleClose={()=>{}} />)

    const title = screen.getByText(mockedItemImage.title);
    const author = screen.getByText(mockedItemImage.copyright);
    const desc = screen.getByText(mockedItemImage.explanation);
    const date = screen.getByText(mockedItemImage.date);
    const image = screen.getByTestId("apod-image");
    const link = screen.queryByText("Watch Video");


    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()
    expect(desc).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(link).not.toBeInTheDocument()
  })

  it('renders picture dialog with title, author, description, date and image  for videos', () => {
    render(<PictureDialog item={mockedItemVideo} isOpen={true} handleClose={()=>{}} />)

    const title = screen.getByText(mockedItemVideo.title);
    const author = screen.getByText(mockedItemVideo.copyright);
    const desc = screen.getByText(mockedItemVideo.explanation);
    const date = screen.getByText(mockedItemVideo.date);
    const image = screen.getByTestId("apod-image");
    const link = screen.getByText("Watch Video");

    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()
    expect(desc).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(link).toBeInTheDocument()
  })

  it('renders picture dialog with close button', () => {
    render(<PictureDialog item={mockedItemImage} isOpen={true} handleClose={()=>{}} />)

    const closeButton = screen.getByText("Close");

    expect(closeButton).toBeInTheDocument();
  })

  it('calls handleClose function after clicking on "Close" button', () => {
    const mockedHandleClose = jest.fn()
    render(<PictureDialog item={mockedItemImage} isOpen={true} handleClose={mockedHandleClose} />)

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton)
    expect(mockedHandleClose).toHaveBeenCalledTimes(1)
  })
})