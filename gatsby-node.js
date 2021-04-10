const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      new NodePolyfillPlugin()
    ]
  })
}