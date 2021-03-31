const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const miniCssExtractPlugin = new MiniCssExtractPlugin();

const htmlPlugin = new HtmlWebPackPlugin({
  template: './front/index.html',
  filename: './index.html',
});
module.exports = {
  entry: './front/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [miniCssExtractPlugin, htmlPlugin],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
};
