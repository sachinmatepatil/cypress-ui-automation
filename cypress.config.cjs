const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

// 👇 Version-safe import for esbuild plugin
let createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
if (typeof createEsbuildPlugin !== "function") {
  createEsbuildPlugin = createEsbuildPlugin.default;
}

const path = require("path");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com/",
    specPattern: "cypress/e2e/features/**/*.feature",
    chromeWebSecurity: false,

    async setupNodeEvents(on, config) {
      // 🥒 Enable cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // ⚙️ Attach ESBuild bundler with Node polyfills
      on(
        "file:preprocessor",
        createBundler({
          plugins: [
            createEsbuildPlugin(config),

            // ✅ Proper polyfill setup for missing Node modules (like crypto)
            {
              name: "node-polyfills",
              setup(build) {
                const polyfills = {
                  crypto: "crypto-browserify",
                  stream: "stream-browserify",
                  buffer: "buffer/",
                  util: "util/",
                  process: "process/browser",
                  path: "path-browserify",
                };

                for (const [mod, replacement] of Object.entries(polyfills)) {
                  build.onResolve({ filter: new RegExp(`^${mod}$`) }, () => ({
                    path: require.resolve(replacement),
                  }));
                }

                // 👇 Define window globals (important for crypto & buffer)
                build.initialOptions.define = {
                  ...(build.initialOptions.define || {}),
                  global: "window",
                };
              },
            },
          ],
        })
      );

      on("after:run", () => {
        console.log("✅ Test run complete. Reports generated successfully!");
      });

      return config;
    },
  },

  // ✅ Cucumber report config
  cucumberJson: {
    generate: true,
    outputFolder: "reports/json",
    filePrefix: "",
    fileSuffix: ".cucumber",
    outputFile: "cucumber_report.json",
  },

  viewportWidth: 1366,
  viewportHeight: 768,
  video: true,
  retries: 1,
  execTimeout: 12000,
  pageLoadTimeout: 24000,
});
