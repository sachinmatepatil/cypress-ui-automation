const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");

// 🧠 Handles both export types for compatibility
const esbuildImport = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createEsbuildPlugin =
  typeof esbuildImport === "function" ? esbuildImport : esbuildImport.default;

const path = require("path");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    chromeWebSecurity: false,
    specPattern: "cypress/e2e/features/**/*.feature",

    async setupNodeEvents(on, config) {
   // 🥒 Enable Cucumber Preprocessor
   await addCucumberPreprocessorPlugin(on, config);

   // ⚙️ Register ESBuild bundler + node polyfills
   on(
     "file:preprocessor",
     createBundler({
       plugins: [
         createEsbuildPlugin(config),
 
         // ✅ Add Node polyfills for browser
         {
           name: "node-polyfills",
           setup(build) {
             const polyfills = {
               crypto: require.resolve("crypto-browserify"),
               stream: require.resolve("stream-browserify"),
               buffer: require.resolve("buffer/"),
               util: require.resolve("util/"),
               process: require.resolve("process/browser"),
               path: require.resolve("path-browserify"),
             };
 
             for (const [mod, resolvedPath] of Object.entries(polyfills)) {
               build.onResolve({ filter: new RegExp(`^${mod}$`) }, () => ({
                 path: resolvedPath,
                 namespace: "polyfill",
               }));
             }
 
             // 👇 Inject globals for crypto and buffer
             build.initialOptions.define = {
               ...(build.initialOptions.define || {}),
               global: "window",
             };
           },
         },
       ],
     })
   );
 
      // 🧾 Log confirmation after run
      on("after:run", () => {
        console.log("✅ Test run complete. JSON report will be generated under reports/json/");
      });

      return config;
    },

    // 📏 Browser configuration
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true,
    retries: 1,
    execTimeout: 12000,
    pageLoadTimeout: 24000,
  },

  // 🧩 Cucumber JSON report setup
  cucumberJson: {
    generate: true,
    outputFolder: "reports/json",
    filePrefix: "",
    fileSuffix: ".cucumber",
    outputFile: "cucumber_report.json",
  },
});
