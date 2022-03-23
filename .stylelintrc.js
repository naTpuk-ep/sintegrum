module.exports = {
  extends: ["stylelint-config-standard",
    "stylelint-config-rational-order",
    "stylelint-prettier/recommended"],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    "at-rule-no-unknown": null,
    "max-line-length": [
      true,
      {
        "string-quotes": "single",
        "ignore": ["comments"],
        "ignore-pattern": "^import |^export {(.*?)}",
        "check-strings": true,
        "check-regex": true
      }
    ]
  }
};
