const withTM = require("next-transpile-modules")(["@primer/react-brand"]);

module.exports = withTM({
  reactStrictMode: true,
});
