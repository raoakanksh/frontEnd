const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // To handle HTML file

module.exports = {
  entry: './src/index.js', // Your main JS file entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output the bundled JS file to 'dist'
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'public'), // Serve from 'public' folder
    hot: true,
    open: true, // Automatically open browser
    historyApiFallback: true, // Support for React Router
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Template HTML file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // CSS loaders for styling
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
