import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render the travel planner input', () => {
        render(<App />);

        const travelInput = screen.getByText('Travel Planner');
        expect(travelInput).toBeInTheDocument();
    });
});
