const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './index.ts',
    // entry: './App.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle')
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'bundle'),
        port: 4200
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                  dynamicTyping: true,
                  header: true,
                  skipEmptyLines: true
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
      }
};