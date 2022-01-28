import { render, screen } from '@testing-library/react'
import Main from './index'

describe('Main', () => {
  it('renders a heading', () => {
    render(<Main />)

    const heading = screen.getByText("Astronomy Picture of the Day");

    expect(heading).toBeInTheDocument()
  })
})