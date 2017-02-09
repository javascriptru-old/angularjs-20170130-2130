module.exports = {
    entry: './app.js',
    output: {
        path: '.',
        filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [{
                test: /\.html$/,
                loader: 'ng-cache?prefix=[dir]/[dir]'
            },
            {

                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
}
