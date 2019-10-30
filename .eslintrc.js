const path = require("path");

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    settings: {
        "import/resolver": {
            webpack: {
                config: path.resolve(__dirname, ".webpack/base.js")
            }
        }
    },
    extends: [
        "airbnb",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "global-require": "off",
        "react/no-find-dom-node": "off",
        "react/button-has-type": "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-filename-extension": [
            "error",
            { extensions: [".tsx", ".jsx"] }
        ],
        "react/prop-types": ["off"],
        "import/no-anonymous-default-export": "error",
        "prefer-arrow-callback": "error",
        "arrow-parens": "off",
        "space-before-function-paren": "off",
        "operator-linebreak": "off",
        "implicit-arrow-linebreak": "off",
        "function-paren-newline": "off",
        "no-undef": "off",
        "no-unused-vars": "error",
        "no-console": "off",
        "no-plusplus": "off",
        "no-shadow": "off",
        "no-continue": "off",
        "no-param-reassign": "off",
        "no-new": "off",
        "wrap-iife": "off",
        "class-methods-use-this": "off",
        "no-underscore-dangle": "off",
        "no-use-before-define": ["error", "nofunc"],
        "no-loop-func": "off",
        "no-multi-assign": "off",
        strict: ["error", "never"],
        "consistent-return": "off",
        "max-len": "off",
        "one-var": "off",
        "func-names": [1, "never"],
        "no-mixed-spaces-and-tabs": "error",
        "no-unused-expressions": [
            "error",
            {
                allowTernary: true
            }
        ],
        camelcase: ["off"]
    }
};
