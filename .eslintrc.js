module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "installedESLint": true,
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "rules": {
       "strict": 1
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": [
            "error", 
            { 
                allow: ["warn", "error", "log"]
            }
        ],
        "indent": [
            "warn",
            "tab",
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "off",
            "unix"
        ],
        "quotes": [
            "off",
        ],
        "semi": [
            "off",
        ],
        "react/prop-types": 0
    }
};