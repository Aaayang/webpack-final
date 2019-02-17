let babel = require('@babel/core');
let loaderUtils = require('loader-utils');

function loader(source) {
    let options = loaderUtils.getOptions(this); // { presets: [ '@babel/preset-env' ] }
    let cb = this.async(); // flag
    babel.transform(source, {
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop()
    }, function(err, result) {
        cb(err, result.code, result.map); // 异步
    });
    return source;
}

module.exports = loader;