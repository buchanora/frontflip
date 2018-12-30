const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const path = require('path');

exports.devServer = function(options) {
    return {
        devServer: {
            historyApiFallback: true,
            inline: true,
            hot: true,
            stats: "errors-only",
            host: options.host,
            port: options.port,
            publicPath: options.publicPath,
            contentBase: options.contentBase
        },
        plugins: [
            // new webpack.HotModuleReplacementPlugin({
            //     multistep: true
            // }),
            new webpack.NamedModulesPlugin(),
        ]
    };
}

exports.minify = function(){
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                beautify:false,
                comments: false,
                compress: {
                    warnings: false,
                    drop_console: false
                },
                mangle: {
                    except: ["$", "webpackJsonp"],
                    screw_ie8: true,
                    keep_fnames: true
                }
            })
        ]
    };
}

exports.setFreeVariable = function(key, value){
    const env = {};
    env[key] = JSON.stringify(value);
    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };

}

exports.extractBundle = function(options){
    const entry = {};
    entry[options.name] = options.entries;
    return {
        entry: entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, "manifest"]
            })
        ]
    };
}

exports.cleanBuildFolder = function (path){
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                root: process.cwd()
            })
        ]
    };
}
// production css config
exports.extractSCSS = function(paths){
    return{
        module: {
            rules: [
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                {
                    test:[/\.scss$/, /\.sass$/],
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            "css-loader?sourceMap", 
                            "postcss-loader", 
                            {
                                loader: 'sass-loader',
                                options:{
                                    sourceMap: true,
                                    data: `@import "${paths.theme}";`,
                                    includePaths: paths.vendor
                                }
                            }
                        ]
                    }),
                    include: paths.vendor
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("[name].[chunkhash].css")
        ]
    };
}
// Alternative css loader config for dev server
exports.setupCSS = function(paths){
    return{
        module:{
            rules: [
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                {
                    test: [/\.scss$/, /\.sass$/],
                    use: [  
                            {
                                loader: 'style-loader',
                            },
                            {
                                loader: 'css-loader?sourceMap',
                                options:{
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                            },
                            {
                                loader: 'sass-loader',
                                options:{
                                    sourceMap: true,
                                    data: `@import "${paths.theme}";`,
                                    includePaths: paths.vendor
                                }
                            }
                        ],

                }
            ]
        }
    };
}
exports.purifyCSS = function(paths){
    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                paths: paths,
                moduleExtensions: ['.html', '.jsx', '.js'],
                purifyOptions:{
                    minify: true,
                    info: true,
                    // rejected: true
                }
            })
        ]
    };
}
exports.transformJS = function(paths){
    return{
        module: {
            rules: [
                {
                    test: [/\.es6$/, /\.js$/, /\.jsx$/],
                    use: [
                        {
                            loader: 'babel-loader?cacheDirectory',
                        }
                    ],
                    include: paths
                }
            ]
        }
    };
}
// the load images interface works on build config and compresses image files
exports.loadImages = function(paths){
    return{
        module: {
            rules: [
                {
                    test: /.*\.(svg|jpg|png)$/i,
                    use: 'file-loader?name=./assets/img/[name].[hash].[ext]',
                    include: paths
                }
            ]
        },
    };
}
exports.loadFonts = function(paths){
    return{
        module:{
            rules: [
              {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader?mimetype=image/svg+xml&name=./assets/fonts/[hash].[ext]'
              },{
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader?mimetype=application/font-woff&name=./assets/fonts/[hash].[ext]"
              },{
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader?mimetype=application/font-woff&name=./assets/fonts/[hash].[ext]"
              },{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader?mimetype=application/octet-stream&name=./assets/fonts/[hash].[ext]"
              },{
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                use: "file-loader"
              },
            ]
        }
    }
}

// Secondary Configs
exports.transformJSHot = function(paths){
    return{
        module: {
            rules: [
                {
                    test: [/\.es6$/, /\.js$/, /\.jsx$/],
                    use: [
                        {
                            loader: 'babel-loader?cacheDirectory',
                        }
                    ],
                    include: paths
                }
            ]
        },
        plugins: [
            //moves errors overlay from devserver served pages to the console
            new webpack.NoEmitOnErrorsPlugin()
        ]
    };
}

exports.inlineImages = function(paths, limit){
    return{
        module: {
            rules: [
                {
                    test: /\.(jpeg|jpg|png)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: limit
                            }
                        }
                    ],
                    include: paths
                }
            ]
        }
    };
}

exports.inlineFonts = function(paths, limit){
  return{
    module: {
      rules: [
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: limit
                  }
              }
          ],
          include: paths
        }
      ]
    }
  }
}
exports.loadSVG = function(paths){
    return{
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: 'file-loader',
                    include: paths
                }
            ]
        }
    };
}
