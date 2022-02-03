import { render, screen } from '@testing-library/react'
import Main from './index'

describe('Main', () => {
  it('renders a heading', () => {
    render(<Main />)

    const heading1 = screen.getByText("Astronomy");
    const heading2 = screen.getByText("Picture of the Day");

    expect(heading1).toBeInTheDocument()
    expect(heading2).toBeInTheDocument()
  })
})