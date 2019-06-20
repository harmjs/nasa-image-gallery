const path = require('path');
const nodeExternals = require('webpack-node-externals');
const DotenvWebpackPlugin = require('dotenv-webpack');


module.exports = {
  common: {
    entry: path.resolve(__dirname, 'src', 'server', 'app.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
      __dirname:  false,
      __filename: false
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/, 
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          }
        }
      ]
    },
    plugins: [
      new DotenvWebpackPlugin()
    ]
  },
  development: {
    mode: 'development',
  }
}