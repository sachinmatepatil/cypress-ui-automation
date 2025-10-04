const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com/",
    chromeWebSecurity: false, //To allow testing sites that load 3rd-party scripts
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config); // ✅ no custom stepDefinitions path

      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      }));
    


      return config;
      
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true,
    retries: 1
  },
});
