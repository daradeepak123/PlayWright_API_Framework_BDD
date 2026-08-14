module.exports = {
  default: {
    require: ['stepDefinitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:cucumber-report.html',
      'json:cucumber-report.json',
      'junit:cucumber-report.xml'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: 2,
    dryRun: false,
    failFast: false,
    strict: true
  },
  'chrome': {
    require: ['stepDefinitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:cucumber-report-chrome.html',
      'json:cucumber-report-chrome.json'
    ],
    parallel: 1,
    tags: 'not @skip and not @manual'
  },
  'firefox': {
    require: ['stepDefinitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:cucumber-report-firefox.html'
    ],
    parallel: 1,
    tags: 'not @skip'
  },
  'smoke': {
    require: ['stepDefinitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'json:cucumber-report-smoke.json'],
    tags: '@smoke and not @skip',
    parallel: 2
  },
  'regression': {
    require: ['stepDefinitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'json:cucumber-report-regression.json'],
    tags: 'not @skip and not @manual',
    parallel: 4
  }
};
