const environment = require("./environment")
const webpack = require("webpack")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
// environment.plugins.delete("UglifyJs")
// environment.plugins.append("UglifyJs", new UglifyJSPlugin())
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const stylus = require('./stylus')
// environment.loaders.append('stylus', stylus)

// environment.plugins.append('UglifyJs', new UglifyJSPlugin({
//     cache: true,
//     parallel: true,
//     uglifyOptions: {
//       compress: false,
//       ecma: 6,
//       mangle: true
//     },
      // sourceMap: true
// }))

const config = environment.toWebpackConfig()

console.log(environment.config)
config.plugins = [
  ...config.plugins,
  // new BundleAnalyzerPlugin(),
//   new webpack.optimization.UglifyJSPlugin({
//     beautify: false,
//     comments: false,
//     compress: {
//         sequences     : true,
//         booleans      : true,
//         loops         : true,
//         unused      : true,
//         warnings    : false,
//         drop_console: true,
//         unsafe      : true
//     }
// }),
// new UglifyJSPlugin(
//   {
//     cache: true,
//     parallel: true,
//     uglifyOptions: {
//       compress: false,
//       ecma: 6,
//       mangle: true
//     },
//     sourceMap: true
//   }
// ),
new CompressionPlugin({
  filename: "[path].gz[query]",
  algorithm: "gzip",
  test: /\.js$|\.css$|\.html$/,
  threshold: 10240,
  minRatio: 0.8
}),

// new UglifyJSPlugin()
]

const expObj = {
  ...config,
//   optimization: {
//     minimizer: [
//       new UglifyJSPlugin(
//         {
//           cache: true,
//           parallel: true,
//           uglifyOptions: {
//             compress: false,
//             ecma: 6,
//             mangle: true
//           },
//           sourceMap: true
//         }
//       ),
//     ],
// },
}

console.log("************")
console.log(expObj)
console.log("************")


module.exports = expObj
