const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    
    // The entry JS file from which to build webpack
    // dependency graph:
    entry: './src/index.js',

    // Write the resulting bundled JS file
    // as "dist/main.js".
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    // While 'main.js' is the entry point module,
    // it may import/require other modules.
    module: {
        rules: [

            // PROCESS CSS FILES:
            // When a ".css" file is imported, first
            // the 'css-loader' processes any "imports"
            // or "url(...)" statements inside the CSS. Then,
            // the 'style-loader' takes the result from the
            // first step and generates JS code that will
            // inject the CSS into the DOM of the page.
            // 
            // NOTE: Any url('image.png') will resolve to
            // require('./image.png');
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },

            // PROCESS IMAGES:
            // Simply copies the images into the output folder.
            // When image is imported (as fromt he NOTE above),
            // the imported variable is a url to the final dest.
            // of the image.
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ]
    },

    plugins: [
        new CopyPlugin(
            [
                { 
                    from: 'static',
                    to: './static',
                },
            ]
        ),
    ],

    optimization: {
        minimize: false,
    },
}