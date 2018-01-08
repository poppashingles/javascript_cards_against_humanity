config = {
  entry: __dirname + "/app.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/../client/build"
  },
  devtool: 'source-map'
}

module.exports = config;
