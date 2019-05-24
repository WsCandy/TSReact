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
    overrides: [
        {
            files: ["src/**/*"],
            excludedFiles: "*.ejs"
        }
    ],
    extends: "airbnb",
    parser: "typescript-eslint-parser",
    plugins: ["typescript"],
    rules: {
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
        "jsx-a11y/label-has-associated-control": [
            2,
            {
                labelComponents: ["Label"],
                labelAttributes: ["label"],
                controlComponents: ["Input"],
                depth: 3
            }
        ],
        "jsx-a11y/label-has-for": "off",
        "react/prop-types": ["off"], // Typescript handles this for me :)
        "typescript/no-unused-vars": "error",
        "import/no-anonymous-default-export": "error",
        "comma-dangle": [
            "error",
            {
                arrays: "never",
                objects: "never",
                imports: "never",
                exports: "never",
                functions: "never"
            }
        ],
        "comma-style": ["error", "last"],
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
        quotes: ["error", "double"],
        "no-underscore-dangle": "off",
        "no-use-before-define": ["error", "nofunc"],
        "no-loop-func": "off",
        "no-multi-assign": "off",
        strict: ["error", "never"],
        "consistent-return": "off",
        "max-len": "off",
        "one-var": "off",
        "func-names": [1, "never"],
        indent: ["error", 4],
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
