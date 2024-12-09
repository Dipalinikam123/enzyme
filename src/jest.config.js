module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', 
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|@mui)/', 
  ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./enzyme.setup.js'],
  
};
