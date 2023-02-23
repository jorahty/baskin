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
  coverageThreshold: {
    global: {
      statements: -2,
      branches: -18,
      lines: -2,
      functions: -1,
    }
  },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};

module.exports = createJestConfig(customJestConfig);
