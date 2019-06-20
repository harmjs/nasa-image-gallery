const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  common: {
    entry: path.resolve(__dirname, 'src', 'client', 'index.js'),
    output: {
      path: path.join(__dirname, 'dist', 'static'),
      filename: 'bundle.js'
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/, 
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          }
        },
        { 
          test: /\.scss$/, 
          exclude: /node_modules/, 
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'client', 'index.html'),
      })
    ]
  },
  development: {
    mode: 'development',
    devtool: 'inline-source-map'
  }
}