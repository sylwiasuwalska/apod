import { render, screen } from '@testing-library/react'
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

describe('PictureDialog', () => {
  it('renders picture dialog with title, author', () => {
    render(<PictureDialog item={mockedItemImage} isOpen={true} handleClose={()=>{}} />)

    const title = screen.getByText(mockedItemImage.title);
    const author = screen.getByText(mockedItemImage.copyright);

    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()
  })

})