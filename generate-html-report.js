const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports/json", // path of JSON output
  reportPath: "reports/html", // path where HTML will be saved
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Local Test Machine",
    platform: {
      name: "macOS",
      version: "13.5",
    },
  },
  customData: {
    title: "Cypress BDD Test Report",
    data: [
      { label: "Project", value: "DemoQA Cypress BDD" },
      { label: "Created By", value: "Sachin Mate" },
      { label: "Execution Time", value: new Date().toLocaleString() },
    ],
  },
});
