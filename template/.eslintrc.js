module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  extends: [
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'scripts/webpack/base.conf.js'
      },
    },
  },
}
