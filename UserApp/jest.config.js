const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/node_modules/**"],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "src/pages/_document.tsx",
    "src/pages/_app.tsx",
  ],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};

module.exports = createJestConfig(customJestConfig);
