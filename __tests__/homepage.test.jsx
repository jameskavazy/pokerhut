import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../src/app/page'


jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe ('App', ()=> {

    it('renders a heading', () => {
        render(<App></App>)
        const heading = screen.getByRole('heading', {level: 1})
        expect(heading).toBeInTheDocument()
    })
})

