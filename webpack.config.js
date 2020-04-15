var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        bootstrap: './src/bootstrap/js/bootstrap.min.js'
    },
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [new HtmlWebPackPlugin({template: 'index.html'})],
    devServer: {
        stats: "errors-only",
        overlay: true,
        contentBase: path.join(__dirname, 'dist'),
        host: process.env.HOST,
        port: process.env.PORT,
        open: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.exec\.js$/,
                use: ['script-loader']
            }
        ]
    },
};
