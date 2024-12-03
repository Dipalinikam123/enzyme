module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Transform TypeScript and JavaScript files using Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|@mui)/', // Don't ignore axios and @mui (Material UI) when transforming
  ],
  testEnvironment: 'jsdom', // Ensure Jest uses the jsdom environment for React testing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  
};
