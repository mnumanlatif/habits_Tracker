// jest.config.js
export default {
  preset: 'ts-jest/presets/default-esm',   // use ts-jest ESM preset
  testEnvironment: 'node',                  // node environment
  extensionsToTreatAsEsm: ['.ts'],          // treat ts files as ESM
  moduleNameMapper: {
    // This helps fix imports ending with .js in TS source files
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transformIgnorePatterns: [
    // Transform chalk because it's published as ESM and breaks Jest by default
    'node_modules/(?!chalk)',
  ],
  globals: {
    'ts-jest': {
      useESM: true,  // enable ESM support in ts-jest
    },
  },
};
