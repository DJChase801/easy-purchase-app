// src/__mocks__/mockStores.js
export const mockAppStore = {
    someMethod: jest.fn(),
    someProperty: 'test value',
};

export const rootStore = {
    AppStore: mockAppStore,
};
