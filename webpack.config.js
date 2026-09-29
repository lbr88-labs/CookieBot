const path = require('path');
const fs = require('fs');

// Read version from package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = packageJson.version;

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
    filename: `cookieAutoPlayBeta-v${version}.js`,
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
