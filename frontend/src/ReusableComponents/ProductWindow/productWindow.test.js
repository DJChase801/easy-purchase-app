import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProductWindow from './productWindow';
import { cleanup } from '@testing-library/react';  

describe('ProductWindow', () => {
    const mockProducts = [
        { product_id: '2323', name: 'Apple', price: 1.99, image: ''},
        { product_id: '2323', name: 'Banana', price: 2.99, image: ''},
    ];

    it('should render search input and filter products based on search', () => {
        render(<ProductWindow products={mockProducts} showSearch={true} btnText="Add" action={() => {}} />);
        
        const searchInput = screen.getByPlaceholderText("Search Products...");
        expect(searchInput).toBeInTheDocument();

        fireEvent.change(searchInput, { target: { value: 'Banana' } });

        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    it('renders different labels based on btnText prop', () => {
        const { rerender } = render(<ProductWindow products={mockProducts} showSearch={false} btnText="Add" action={() => {}} />);
        expect(screen.getByText('Available Products:')).toBeInTheDocument();

        rerender(<ProductWindow products={mockProducts} showSearch={false} btnText="Remove" action={() => {}} />);
        expect(screen.getByText('Your Cart:')).toBeInTheDocument();
    });

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
        jest.clearAllTimers();
      });      
});
