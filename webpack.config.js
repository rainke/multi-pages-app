const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OpenBrowserPlugin = require('./plugins/openBrowser');
const devConfig = require('./dev-config');

const entrys = ['index', 'more', 'contact', 'none'];
const entry = entrys.reduce((prev, next) => {
  const ret = prev;
  ret[next] = ['./client-server.js', `./src/js/${next}.js`];
  return ret;
}, {});

const plugins = [new webpack.HotModuleReplacementPlugin() /* , new webpack.ProvidePlugin({
  $: 'zepto/dist/zepto.min.js'
}) */];
entrys.forEach((name) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    inject: 'head',
    name,
    filename: `${name}.html`,
    template: path.join(__dirname, 'src/entry/entry.js'),
    chunks: [name]
  });
  plugins.push(htmlPlugin);
});

plugins.push(
  new FriendlyErrorsWebpackPlugin(),
  new OpenBrowserPlugin({ port: devConfig.port })
);

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.join(__dirname, 'src')
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.less$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.ejs$/,
          /\.svg$/
        ],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: require.resolve('zepto/dist/zepto.min.js'),
        loader: 'exports-loader?window.Zepto!script-loader'
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        include: path.join(__dirname, 'src'),
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ]
                })
              ]
            }
          },
          'less-loader?sourceMap'
        ]
      }
    ]
  },
  plugins
};
