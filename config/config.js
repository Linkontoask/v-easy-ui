const path = require('path')
const nodeExternals = require('webpack-node-externals')
const Components = require('../components.json')
const { VueLoaderPlugin } = require('vue-loader')

let externals = {}

const resolve = src => path.resolve(__dirname, '../', src)

Object.keys(Components).forEach(key => {
  externals[
    `v-easy-components/packages/${key}`
  ] = `v-easy-components/lib/${key}`
})

externals['v-easy-components/locale'] = 'v-easy-components/locale'

externals = [
  Object.assign(
    {
      vue: 'vue'
    },
    externals
  ),
  nodeExternals()
]

const alias = {
  '@': resolve('src'),
  '@packages': resolve('packages'),
  lib: resolve('lib'),
  vue: '@vue/runtime-dom'
}

const extensions = ['.ts', '.js', '.vue', '.json']

const modules = [resolve('node_modules')]

exports.extensions = extensions
exports.externals = externals
exports.alias = alias

exports.modules = modules

exports.resolve = {
  extensions: extensions,
  alias: alias,
  modules: modules
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

exports.plugins = [new VueLoaderPlugin()]

exports.rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      preserveWhitespace: false,
      loaders: {
        ts: 'ts-loader',
        tsx: 'babel-loader!ts-loader'
      }
    }
  },
  {
    test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
    loader: 'url-loader'
  },
  {
    test: /\.(png|jpg|JPG|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {}
      }
    ]
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    loader: ['ts-loader', 'eslint-loader']
  },
  {
    test: /\.js$/,
    loader: ['babel-loader', 'eslint-loader'],
    include: [resolve('example'), resolve('src'), resolve('packages')]
  }
]
