import { render, fireEvent, screen } from '@testing-library/react';
import TopBar from './topBar';
import { cleanup } from '@testing-library/react';


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('TopBar', () => {
    it('should handle navigation on menu item click', () => {
        const mockModel = {
            navigateToPage: jest.fn(),
        };
        render(<TopBar model={mockModel} />);
        expect(screen.getByTestId('app-title')).toBeInTheDocument();

        const nav = screen.getByTestId('nav');
        fireEvent.click(nav);
        fireEvent.click(screen.getByText('Home'));

        // Verify that the correct navigation function was called
        expect(mockModel.navigateToPage).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
        jest.clearAllTimers();
    });
});
