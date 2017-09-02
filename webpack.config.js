const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/js/app.ts', './src/scss/main.scss'],
    devtool: 'inline-source-map',
    module: {
        rules: [{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configuration: {
                        rules: {
                            quotemark: [true, 'double']
                        }
                    },
                    configFile: false,
                    emitErrors: false,
                    failOnHint: true,
                    typeCheck: false,
                    fix: false,
                    tsConfigFile: 'tsconfig.json'
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('build', {
            verbose: true,
            dry: false
        }),
        new StyleLintPlugin({
            context: "src",
            configFile: '.stylelintrc.json',
            files: '**/*.scss',
            failOnError: false,
            quiet: false,
            syntax: 'scss'
        }),
        new ExtractTextPlugin({
            filename: "[name].bundle.css",
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: './src/index.html'
        })

    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'build')
    }
};
