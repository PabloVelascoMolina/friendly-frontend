const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

let basePath = path.join(__dirname, '/');

let config = {
    // Entry, file to be bundled
    entry: {
        'main': basePath + '/src/main.js',
    },
    devtool: 'source-map',
    output: {
        // Output directory
        path: basePath + '/dist/',
        library: '[name]',
        // [hash:6] with add a SHA based on file changes if the env is build
        filename: env === EnvEnum.BUILD ? '[name]-[hash:6].min.js' : '[name].min.js',
        libraryTarget: 'amd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
                test: /(\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    // babel-loader to convert ES6 code to ES5 + amdCleaning requirejs code into simple JS code, taking care of modules to load as desired
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: []
                    }
                }
            }, { test: /jQuery/, loader: 'expose-loader?$' },
            { test: /application/, loader: 'expose-loader?application' },
            { test: /base64/, loader: 'exports-loader?Base64' }
        ]
    },
    resolve: {
        alias: {
            'jQuery': 'bower_components/jquery/dist/jquery.min',
            'application': 'main',
            'base64': 'vendor/base64'
        },
        modules: [
            // Files path which will be referenced while bundling
            'src/**/*.js',
            'src/bower_components',
            path.resolve('./src')
        ],
        extensions: ['.js'] // File types
    },
    plugins: [

    ]
};

module.exports = config;