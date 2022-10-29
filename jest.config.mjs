import nextJest from 'next/jest';

// https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
const createJestConfig = nextJest({
  dir: './',
});

export default createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
});
