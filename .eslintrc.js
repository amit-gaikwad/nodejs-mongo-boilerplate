module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'crlf',
      },
    ],
  },
  ignorePatterns: ['.eslintrc.js', '*.test.js'],
};

// {
//     "env": {
//         "node": true
//     },
//     "extends": [
//         "airbnb-base",
//         "plugin:prettier/recommended"
//     ],
//     "parserOptions": {
//         "ecmaVersion": 2018
//     },
//     "rules": {
//         "no-console": "error",
//         "linebreak-style":"off",
//         "prettier/prettier": [
//             "warn",
//             {
//               "endOfLine": "auto"
//             }
//           ]
//     }
// }
