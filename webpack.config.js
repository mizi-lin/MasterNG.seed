const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');


//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

console.log('oOooooOoo::::::', NODE_ENV);

const ENV_DEV = NODE_ENV === 'dev';
const ENV_PROD = NODE_ENV === 'prod';
const ENV_TEST = NODE_ENV === 'test';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3333;

//=========================================================
//  CONST
//---------------------------------------------------------
const config = {};
module.exports = config;

config.resolve = {
    extensions: ['.html', '.ts', '.js'],
    modules: [
        path.resolve(__dirname, 'node_modules')
    ]
};

config.entry = {
    main: ['./src/main.ts'],
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts'
};

config.output = {
    filename: '[name].js',
    path: path.resolve('./dist'),
    publicPath: '/'
};

config.module = {
    loaders: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },

        {
            test: /\.html$/,
            use: 'raw-loader'
        },

        {
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
                publicPath: '../'
            })
        },

        {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader?limit=4098&name=fonts/[name].[hash].[ext]'
        },

        {
            test: /\.(png|jpg|jpge|gif)$/,
            use: 'url-loader?limit=4098&name=images/[name].[hash].[ext]'
        }
    ]
};

config.plugins = [];

config.plugins.push(
    new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
            // postcss: autoprefixer({browsers: ['last 3 versions']}),
            sassLoader: {
                outputStyle: 'compressed',
                precision: 10,
                sourceComments: false
            }
        }
    }),

    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'polyfills'],
        minChunks: Infinity
    }),

    new CopyWebpackPlugin([
        {from: './src/assets', to: 'assets'}
    ]),

    new HtmlWebpackPlugin({
        chunkSortMode: 'dependency',
        filename: 'index.html',
        hash: false,
        inject: 'body',
        template: './src/index.html'
    })
);

//=====================================
//  DEVELOPMENT
//-------------------------------------
if(ENV_DEV) {
    config.devtool = 'cheap-module-source-map';

    config.entry.main.unshift(`webpack-dev-server/client?http://${HOST}:${PORT}`);

    config.devServer = {
        contentBase: './src',
        historyApiFallback: true,
        host: HOST,
        outputPath: config.output.path,
        port: PORT,
        publicPath: config.output.publicPath,
        stats: {
            cached: true,
            cachedAssets: true,
            chunks: true,
            chunkModules: false,
            colors: true,
            hash: false,
            reasons: true,
            timings: true,
            version: false
        }
    };
}


//=====================================
//  TEST
//-------------------------------------
if(ENV_TEST) {
    config.devtool = 'inline-source-map';
}

//=====================================
//  PRODUCTION
//-------------------------------------
if(ENV_PROD) {
    config.devtool = 'source-map';

    config.output.filename = '[name].[chunkhash].js';

    config.plugins.push(
        new WebpackMd5Hash(),
        new ExtractTextPlugin('styles.[contenthash].css'),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                dead_code: false, // eslint-disable-line camelcase
                screw_ie8: false, // eslint-disable-line camelcase
                unused: true,
                warnings: false
            }
        })
    );
}
