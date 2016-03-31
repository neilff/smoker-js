const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-hot-middleware/client');
  }

  return sources;
}

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : '',
  entry: {
    bundle: getEntrySources(['./src/index']),
  },
  output: {
    publicPath: '/dist/',
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      containers: 'src/containers',
      modules: 'src/modules',
      constants: 'constants',
      store: 'src/store',
      shared: 'src/shared',
    },
    extensions: ['', '.js', '.jsx'],
  },
  plugins: process.env.NODE_ENV !== 'production' ?
    [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('styles.css'),
    ] :
    [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      new ExtractTextPlugin('styles.css'),
    ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader',
          'postcss-loader',
          'cssnext-loader'
        ),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader',
          'sass-loader',
        ),
      },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?prefix=img/&limit=5000',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
    ],
  },
};
