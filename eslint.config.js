import upleveled from 'eslint-config-upleveled';

/** @type {import('@typescript-eslint/utils/ts-eslint').FlatConfig.ConfigArray} */
const config = [
  ...upleveled,
  {
    ignores: [
      // Unused variables in default Cypress config
      'cypress.config.ts',
    ],
  },
];

export default config;
