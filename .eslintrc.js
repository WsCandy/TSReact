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
        },
        react: {
            version: "detect"
        }
    },
    overrides: [
        {
            files: ["src/**/*"],
            excludedFiles: "*.ejs"
        }
    ],
    extends: [
        "prettier/@typescript-eslint",
        "eslint:recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "jsx-a11y"],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "react/prop-types": "off",
        "react/no-find-dom-node": "off"
    }
};
