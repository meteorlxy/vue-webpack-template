const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const utils = require('../utils')

const webpackBaseConfig = {
  context: utils.rootPath(),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: utils.distPath(),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': utils.srcPath(),
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true
        }
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.css$/,
        use: [
          ...useCommonStyleLoaders()
        ]
      },

      {
        test: /\.styl(us)?$/,
        use: [
          ...useCommonStyleLoaders(),
          {
            loader: 'stylus-loader',
            options: {
              preferPathResolver: 'webpack'
            }
          }
        ]
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },

      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },

      {
        test: /\.(svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: utils.assetsPath('img/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  node: {
    Buffer: false,
    setImmediate: false,
    global: false,
    process: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

/**
 * Use common loaders for style files. Add pre-proccess loader after them
 *
 * @example
 *    test: /\.scss$/,
 *    use: [
 *      ...useCommonStyleLoaders(),
 *      'sass-loader'
 *    ]
 */
function useCommonStyleLoaders () {
  const isProd = process.env.NODE_ENV === 'production'

  const VueStyleLoader = {
    loader: 'vue-style-loader'
  }

  const MiniCssExtractPluginLoader = {
    loader: MiniCssExtractPlugin.loader
  }

  const CSSLoader = {
    loader: 'css-loader',
    options: {
      localIdentName: `[local]_[hash:base64:8]`,
      sourceMap: !isProd
    }
  }

  const PostCSSLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: [require('autoprefixer')],
      sourceMap: !isProd
    }
  }

  return [
    isProd
      ? MiniCssExtractPluginLoader
      : VueStyleLoader,
    CSSLoader,
    PostCSSLoader
  ]
}

module.exports = webpackBaseConfig
