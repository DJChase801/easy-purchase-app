import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddMemberModal from './addMemberModal';
import { act } from "react-dom/test-utils";

const mockModel = {
  showAddMemberModal: true,
  setShowAddMemberModal: jest.fn(),
  addMember: jest.fn(),
};

jest.mock("mobx-react", () => ({
  observer: (component) => component,
}));

jest.mock("antd", () => ({
  Modal: ({ children, ...props }) => <div {...props}>{children}</div>,
  Input: ({ ...props }) => <input {...props} />,
}));

describe('AddMemberModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('renders the modal', () => {
    render(<AddMemberModal model={mockModel} />);

    expect(screen.getByTestId('add-member-modal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Phone Number.../i)).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<AddMemberModal model={mockModel} />);

    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const phoneInput = screen.getByPlaceholderText(/Phone Number.../i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(phoneInput.value).toBe('1234567890');
  });

  test('handles cancel button click', () => {
    render(<AddMemberModal model={mockModel} />);

    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);

    expect(mockModel.setShowAddMemberModal).toHaveBeenCalledWith(false);
  });

  test('handles add button click', () => {
    render(<AddMemberModal model={mockModel} />);

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    expect(mockModel.addMember).toHaveBeenCalled();
  });
});
