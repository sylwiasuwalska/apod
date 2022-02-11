import { render, screen } from '@testing-library/react'
import Header from './index'

describe('Main', () => {
    it('renders a heading', () => {
        render(<Header />)

        const heading1 = screen.getByText('Astronomy')
        const heading2 = screen.getByText('Picture of the Day')

        expect(heading1).not.toBeInTheDocument()
        expect(heading2).toBeInTheDocument()
    })

    it('renders a date picker', () => {
        render(<Header />)

        const datePickerLabel = screen.getByLabelText('Choose the date')

        expect(datePickerLabel).toBeInTheDocument()
    })
})
