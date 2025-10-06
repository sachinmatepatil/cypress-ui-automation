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
       // Enable cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config); // ✅ no custom stepDefinitions path

      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      }));

      plugins: [
        createEsbuildPlugin(config),
        {
          name: "node-polyfill",
          setup(build) {
            build.onResolve({ filter: /^crypto$/ }, () => ({
              path: require.resolve("crypto-browserify")
            }));
          }
        }
      ]
      
      // ✅ Generate JSON output after run
      on("after:run", () => {
        console.log("✅ Test run complete. Cucumber JSON will be generated under /reports/json/");
      });


      return config;
      
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true,
    retries: 1,
    execTimeout: 12000,
    pageLoadTimeout:24000
  },
    // ✅ Tell Cypress to save cucumber JSON
    cucumberJson: {
      generate: true,
      outputFolder: "reports/json",
      filePrefix: "",
      fileSuffix: ".cucumber",
      outputFile: "cucumber_report.json"
    },
});
