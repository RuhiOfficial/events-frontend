const path = require('path');

module.exports = {
    mode: 'development',
  entry: './src/index.js', // Adjust the entry file accordingly
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // You can adjust this limit based on your needs
              mimetype: 'image/png', // Set the default mimetype to png
              fallback: 'file-loader',
            },
          },
          'image-type-loader',
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'), // Add this line to resolve 'stream' module
    },
  },
};
