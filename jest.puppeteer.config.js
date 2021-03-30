module.exports = {
  rootDir: './',
  verbose: true,
  preset: 'jest-puppeteer',
  testTimeout: 30000,
  testPathIgnorePatterns: ['node_modules'],
  testMatch: ['<rootDir>/test/tests/**/?(*.)(spec|test).{js,jsx}'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleNameMapper: {
    '@pages(.*)$': '<rootDir>/test/pages/$1',
    '@fixtures(.*)$': '<rootDir>/test/fixtures/$1',
    '@utils(.*)$': '<rootDir>/test/utils/$1',
  },
  moduleFileExtensions: ['js', 'json'],
}
