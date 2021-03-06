// Generated by CoffeeScript 1.10.0
(function() {
  module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
      index: './demo/index.coffee'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/demo'
    },
    module: {
      rules: [
        {
          test: /\.coffee$/,
          loader: "coffee-loader"
        }, {
          test: /\.(coffee\.md|litcoffee)$/,
          loader: "coffee-loader?literate"
        }
      ]
    }
  };

}).call(this);
