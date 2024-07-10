import type { Config } from "@jest/types";
import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest"
import { compilerOptions } from "./tsconfig.json";


const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: [
    "**/src/**/*.spec.ts"
  ],
  rootDir: ".",
  clearMocks: true,
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: {
    "^@/(.*)": '<rootDir>/src/$1',
  }
};

export default config;