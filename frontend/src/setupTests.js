import '@testing-library/jest-dom/extend-expect';

const originalError = console.error;
console.error = (...args) => {
    if (args[0].includes('Warning: ')) {
        return;
    }
    args.forEach((arg) => {
        if (arg.includes('Warning: ')) {
            return;
        }
    });
    originalError.call(console, ...args);
};
