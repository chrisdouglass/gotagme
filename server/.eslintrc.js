module.exports = {
    "extends": [
      "google",
      "plugin:promise/recommended",
    ],
    "env": {
      "node": true,
      "mocha": true,
      "es6": true
    },
    "parser": "typescript-eslint-parser",
    "parserOptions": {
      "ecmaVersion": 8,
      "sourceType": "module"
    },
    "plugins": [
      "promise",
    ],
};