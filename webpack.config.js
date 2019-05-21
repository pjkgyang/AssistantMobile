var path = require('path');
var webpack = require('webpack');
const vuxLoader = require('vux-loader');


function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

const webpackConfig = {
  // entry: './src/main.js',
  entry: {
    app: ['babel-polyfill', './src/main.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    // publicPath:'/emap/sys/etender/wx/beta/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {

        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",

      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      // {
      //   test: /vux.src.*?js$/,
      //   loader: 'babel-loader',
      //   query: {
      //     presets: ['es2015']
      //   }
      // },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   query: {
      //     presets: ['es2015']
      //   },
      //   include: [resolve('src'), resolve('test'), resolve('node_modules/_vue-date-time-m@1.0.30@vue-date-time-m/dist/vue-date-time-m.js')]
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'),resolve('node_modules/_vue-date-time-m@1.0.30@vue-date-time-m')]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
      //'@':__dirname + "/src"
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  // 开发配置
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: '0.0.0.0',
    port: 8082,
    // proxy: {
    //   'apis/': {
    //     target: 'http://careful.wisedu.com:8887/emap/sys/etender/api/', // 设置你调用的接口域名和端口号
    //     changeOrigin: true,     // 跨域
    //     pathRewrite: {
    //       '^apis/': '/'          
    //     }
    //   }
    // },
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
// 加载vux
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.output.publicPath = './dist/';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      "WINDOW_CONFIG__BASEURL": '"http://careful.wisedu.com/emap/sys/etender/api/"'
      // '"http://careful.wisedu.com:8887/emap/sys/etender/api/"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      // 180.44
      "WINDOW_CONFIG__BASEURL": '"http://172.16.180.53:8080/emap/sys/etender/api/"'
    })
  ])
}