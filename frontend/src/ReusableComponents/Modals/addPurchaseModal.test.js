import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddPurchaseModal from './addPurchaseModal';
import { act } from "react-dom/test-utils";


const mockModel = {
    showAddPurchaseModal: true,
    setShowAddPurchaseModal: jest.fn(),
    addPurchase: jest.fn(),
    members: [
        { member_id: 1, fullName: 'John Doe' },
        { member_id: 2, fullName: 'Jane Smith' },
    ],
    products: [
        { product_id: 1, name: 'Product 1', price: 10.00 },
        { product_id: 2, name: 'Product 2', price: 20.00 },
    ],
};

jest.mock("mobx-react", () => ({
    observer: (component) => component,
}));

jest.mock("antd", () => ({
    Modal: ({ children, ...props }) => <div {...props}>{children}</div>,
    Select: ({ options, ...props }) => (
        <select {...props}>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    ),
    DatePicker: ({ ...props }) => <input type="datetime-local" {...props} />,
    Checkbox: ({ children, ...props }) => (
        <label>
            <input type="checkbox" {...props} />
            {children}
        </label>
    ),
}));

describe('AddPurchaseModal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    test('renders the modal', () => {
        render(<AddPurchaseModal model={mockModel} />);

        expect(screen.getByTestId('add-purchase-modal')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search Members.../i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search Products.../i)).toBeInTheDocument();
    });

    test('handles input changes', () => {
        render(<AddPurchaseModal model={mockModel} />);

        const memberSelect = screen.getByPlaceholderText(/Search Members.../i);
        const productSelect = screen.getByPlaceholderText(/Search Products.../i);
        const processedCheckbox = screen.getByLabelText(/Yes Processed Already/i);

        fireEvent.change(memberSelect, { target: { value: '1' } });
        fireEvent.change(productSelect, { target: { value: '1' } });
        fireEvent.click(processedCheckbox);

        expect(memberSelect.value).toBe('2');
        expect(productSelect.value).toBe('1');
        expect(processedCheckbox.checked).toBe(true);
    });

    test('handles cancel button click', () => {
        render(<AddPurchaseModal model={mockModel} />);

        const cancelButton = screen.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        expect(mockModel.setShowAddPurchaseModal).toHaveBeenCalledWith(false);
    });

    test('handles add button click', () => {
        render(<AddPurchaseModal model={mockModel} />);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        expect(mockModel.addPurchase).toHaveBeenCalled();
    });

});
