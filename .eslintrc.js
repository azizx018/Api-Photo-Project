// module.exports = {
//     "env": {
//         "browser": true,
//         "commonjs": true,
//         "es2021": true
//     },
//     "parser": "@typescript-eslint/parser",
//     "parserOptions": {
//         "ecmaVersion": 12
//     },
//     "plugins": [
//         "@typescript-eslint"
//     ],
//     "rules": {
//     }
// };
module.exports = {
    
    "root": true,
    "parser":"@typescript-eslint/parser",
    "plugins": [
      "prettier"
      
    ],
    "extends": [
      "eslint:recommended",
      "prettier"
    ],
    "rules": {
      "prettier/prettier": 2 ,
      "no-use-before-define": ["error", { "functions": true, "classes": true }],
      "no-var": "error",
      "prefer-const": "error"
    },
    "parserOptions": {
      "ecmaVersion": 11,
      "sourceType": "module"
    },
    "env": {
      "node": true,
      "es6": true
    }

};