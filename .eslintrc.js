// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'comma-dangle':['error', 'never'],
    'import/extensions': ['error', 'always', {
      'js': 'never'
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-mixed-operators': 'off',
    'no-param-reassign': ["error", { "props": false }],
    'func-names': 'off'
  }
}
