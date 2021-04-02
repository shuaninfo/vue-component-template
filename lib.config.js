const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
	entry: [
		'./packages/index.js'
	],
	mode: 'production',
  devtool: '#source-map',
	output: {
		filename: 'index.min.js',
		path: path.join(__dirname, 'lib'),
		publicPath: './',
		libraryTarget: "umd"
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /(\.css|\.less)$/,
				use: [
          {loader: 'style-loader'},
          {
            loader:'css-loader',
            options:{
              sourceMap:true,
              // modules: true,
              // localIdentName: '[local]---[hash:base64:5]'
            }
          },
          // {
          //   loader: 'postcss-loader',
          //   options:{
          //     sourceMap: true,
          //     plugins:()=>[
          //       autoprefixer()
          //     ]
          //   }
          // },
          {
            loader: 'less-loader',
            options:{
              sourceMap:true,
            }
          }
        ],
				exclude: /node_modules/,
			}
		]
	},
	plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
      // cssProcessorOptions: config.build.productionSourceMap
      //   ? { safe: true, map: { inline: false } }
      //   : { safe: true }
    }),
  ]
}
