const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackBaseConfig = require('./base.conf')

const webpackBuildConfig = webpackMerge(webpackBaseConfig, {
  mode: 'production',

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),

    new OptimizeCssAssetsPlugin({
      canPrint: false,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true },
        mergeLonghand: false
      }
    })
  ]
})

module.exports = webpackBuildConfig
