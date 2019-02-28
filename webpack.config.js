const path = require('path');
const DonePlugin = require('./plugins/DonePlugin');
const AsyncPlugin = require('./plugins/AsyncPlugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new DonePlugin(),
        new AsyncPlugin()
    ]    
};