
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,

    retries: {
      runMode: 1,
      openMode: 1,
    },

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
