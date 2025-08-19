module.exports = {
  verbose: true,
  preset: 'react-native',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.(test|spec).(ts|tsx|js)'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)',
  ],
};
