const path = require('path')
const vantTheme = path.resolve(__dirname, "./src/assets/theme.less")

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: './dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: false,
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: '抖音demo',
    }
  },
  css: {
    extract: true,
    sourceMap: true,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 50
          })
        ]
      },
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "${vantTheme}";`
          }
        }
      },
    },
    requireModuleExtension: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
    // 修复HMR
    config.resolve.symlinks(true)
  },
  configureWebpack: config => {
    config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{
            inline: /runtime\..*\.js$/
        }])
        .end()
      config
        .optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            },
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              priority: 2,
              reuseExistingChunk: true
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'),
              minChunks: 3,
              priority: 5,
              reuseExistingChunk: true
            },
            vue: {
              name: 'vue',
              test: /[\\/]node_modules[\\/]vue[\\/]/,
              priority: -10
            }
          }
        })
      config.optimization.runtimeChunk('single')
    }
  },
  parallel: require('os').cpus().length > 1,
  devServer: {
    host: '0.0.0.0',
    port: 8010,
    https: false,
    open: false,
    overlay: {
      warnings: false,
      errors: false
    }
  }
}
