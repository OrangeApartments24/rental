const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
    target: 'web',
    entry: { main: './src/pages/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
          publicPath: ''
    },
    mode: 'development',
    devServer: {
        hot: true,
        compress: true,
        port: 8080,
        open: true,
        static: path.resolve(__dirname, 'dist'),
        watchFiles: ['src/index.html']
    },
    experiments: {
        asset: true
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/'
          },
          {
            test: /\.(?:ico|gif|png|jpg|jpeg|mp4)$/i,
            type: 'asset/resource'
          },
          {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline'
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              'postcss-loader'
            ]
          }
        ] 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
  }