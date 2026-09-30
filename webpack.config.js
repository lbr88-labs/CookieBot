const path = require('path');
module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'cookieAutoPlayBeta-latest.js',
    path: path.resolve(__dirname, 'dist'),
    // Don't export as library - let index.ts handle global assignment
    // library: {
    //   name: 'AutoPlay',
    //   type: 'var',
    //   export: 'default',
    // },
  },
  optimization: {
    minimize: false, // Keep readable for debugging
  },
  devtool: 'source-map',
};
