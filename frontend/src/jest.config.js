module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Ensuring all relevant file types are transformed
    },
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
  };
  