require ('babel-register');
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const partials = require("./libs/webpackPartials");
const pkg = require("./package.json");
const dep = ["react", "react-dom", "react-router", "react-router-dom", "jquery"];

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;
// process.traceDeprecation = true;


const PATHS = {
    app: path.resolve(__dirname, "app"),
    build: path.resolve(__dirname, "public"),
    style: [
        path.resolve(__dirname, "app", "main.scss"),
        path.resolve(__dirname, "app/assets", "vendorCSS/fontawesome/font-awesome"),
        path.resolve(__dirname, "app/assets", "vendorCSS/icofont/icofont")
    ],
    image: path.resolve(__dirname, "app", "assets/img"),
    font: path.resolve(__dirname, "app", "assets/fonts"),
    hmr: 'webpack/hot/only-dev-server',
    wds: 'webpack-dev-server/client?http://localhost:8080'
};

const merge = require("webpack-merge");


const commonConfig = {
    entry: {
        style: PATHS.style,
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: "[name].js",
    },
    // postcss: [
    //     autoprefixer({
    //         browsers: [
    //             'last 2 versions','ie >= 9',
    //             'and_chr >= 2.3'
    //         ]
    //     })
    // ],
    plugins:[
        new HtmlWebpackPlugin({
            title: "Daju",
            template: './libs/template.html',
            // devServer: 'http://localhost:8080',
            appMountId: 'app',
            payStackURL: 'https://js.paystack.co/v1/inline.js',
            googleMapsURL: 'https://maps.google.com/maps/api/js?libraries=places&key=AIzaSyCEqFETZeDbAHQjsZ2K_q5i5eRF5BJAg00',
            inject: false,
            mobile: true
        })
    ],
    resolve: {
        extensions:['.css', '.js', '.es6', '.json', '.scss', '.jsx', '.html']
    },
    module: {
      noParse:[path.resolve(__dirname, 'node_modules/localforage/')],
    },

};


var config;

switch (process.env.npm_lifecycle_event){
    case "stats":
    case "build":
        config = merge(
            commonConfig,
            {
                devtool: "source-map",
                output: {
                    path: PATHS.build,
                    filename: "[name].[chunkhash].js",
                    chunkFilename: "[chunkhash].js"
                }
            },
            partials.cleanBuildFolder(PATHS.build),
            partials.setFreeVariable(
                "process.env.NODE_ENV",
                "production"
            ),
            partials.extractBundle({
                name: "vendor",
                entries: dep
            }),
            partials.minify(),
            partials.extractSCSS(PATHS.style),
            partials.purifyCSS([PATHS.app]),
            partials.transformJS(PATHS.app),
            partials.loadImages(PATHS.image),
            partials.loadFonts(PATHS.font)
        );
        break;
    default:
        config = merge(
            commonConfig,
            partials.devServer({
                host: process.env.HOST,
                port: process.env.PORT,
                publicPath: '/',
                contentBase: '/assets'
            }),
            {
                entry: {
                    wds: PATHS.wds,
                    hmr: PATHS.hmr
                },
                devtool: "eval-source-map"
            },
            partials.setupCSS(PATHS.style),
            partials.transformJSHot(PATHS.app),
            partials.inlineImages(PATHS.image, 25000),
            partials.loadFonts(PATHS.font, 50000)
        );

};

module.exports = config
