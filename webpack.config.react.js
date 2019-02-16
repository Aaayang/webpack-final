const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]' // _dll_react
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', '[name].manifest.json')
        })
    ]
};