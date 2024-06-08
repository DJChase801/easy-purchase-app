import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddProductModal from './addProductModal';
import { act } from "react-dom/test-utils";

const mockModel = {
  showAddProductModal: true,
  setShowAddProductModal: jest.fn(),
  addProduct: jest.fn(),
};

jest.mock("mobx-react", () => ({
  observer: (component) => component,
}));

jest.mock("antd", () => ({
  Modal: ({ children, ...props }) => <div {...props}>{children}</div>,
  Input: ({ ...props }) => <input {...props} />,
  InputNumber: ({ ...props }) => <input type="number" {...props} />,
}));

describe('AddProductModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('renders the modal', () => {
    render(<AddProductModal model={mockModel} />);

    expect(screen.getByTestId('add-product-modal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Image Url.../i)).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<AddProductModal model={mockModel} />);

    const nameInput = screen.getByPlaceholderText(/Product Name/i);
    const imageInput = screen.getByPlaceholderText(/Image Url.../i);

    fireEvent.change(nameInput, { target: { value: 'New Product' } });
    fireEvent.change(imageInput, { target: { value: 'http://example.com/image.png' } });

    expect(nameInput.value).toBe('New Product');
    expect(imageInput.value).toBe('http://example.com/image.png');
  });

  test('handles cancel button click', () => {
    render(<AddProductModal model={mockModel} />);

    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);

    expect(mockModel.setShowAddProductModal).toHaveBeenCalledWith(false);
  });

  test('handles add button click', () => {
    render(<AddProductModal model={mockModel} />);

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    expect(mockModel.addProduct).toHaveBeenCalled();
  });
});
